"use strict";

const axios = require('axios');
const fs = require('fs');

const { program } = require('commander');
const packageData = require('./package.json');

program.version(packageData.version);


program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')
  .requiredOption('-c, --configFile', 'config file');

program.parse(process.argv);

const options = program.opts();

if (options.debug) {
    console.log(options);
}

console.log('pizza details:');

if (options.small) {
    console.log('- small pizza size');
}

if (options.pizzaType) {
    console.log(`- ${options.pizzaType}`);
}

/*
$ pizza-options -d
{ debug: true, small: undefined, pizzaType: undefined }
pizza details:
$ pizza-options -p
error: option '-p, --pizza-type <type>' argument missing
$ pizza-options -ds -p vegetarian
{ debug: true, small: true, pizzaType: 'vegetarian' }
pizza details:
- small pizza size
- vegetarian
$ pizza-options --pizza-type=cheese
pizza details:
- cheese
*/

return;

const openApiPaths = {};
const openApiComponents = {};
const openApiSecuritySchemes = {};

async function parse(fileName) {
    const config = require(fileName);

    let openApiSpecs = [];
    let endpoints = [];
    let paths = {};

    paths["/docs/"] = "<used by swagger-ui>";
    paths["/docs/{a}"] = "<used by swagger-ui>";
    paths["/docs/{a}/{b}"] = "<used by swagger-ui>";

    let globalFilters = [];
    if (config.hasOwnProperty("filter")) {
        globalFilters = config.filter;
    }

    for (const section of config.services) {

        const url = section.url + section.openapi;
        const response = await axios.get(url);


        let filters = [];
        for (const filter of globalFilters) {
            filters.push(filter);
        }

        if (section.hasOwnProperty("filter")) {
            for (const filter in section.filter) {
                filters.push(filter);
            }
        }

        //console.log(response.data);
        openApiSpecs.push(response.data);

        let specs = await parseEndpointData(response.data, filters);

        for (const spec of specs) {
            // console.log(spec);

            let entry = {
                endpoint: spec.path,
                method: spec.verb.toUpperCase(),
                host: section.url,
                url_pattern: spec.path,
                backend: section.name,
                //is_collection: spec.is_collection
            }

            const key = entry.method + "-" + entry.endpoint;
            if (paths.hasOwnProperty(key)) {
                throw "path: " + entry.endpoint + " method: " + entry.method + " already exist on host: " + paths[key];
            }
            paths[key] = section.url;

            endpoints.push(entry);
        }
    }

    const openApi = {
        openapi: config.openapi,
        info: config.info,
        paths: openApiPaths,
        components: {
            schemas: openApiComponents
        }
    }

    if (Object.keys(openApiSecuritySchemes).length > 0) {
        openApi.components.securitySchemes = openApiSecuritySchemes;
    }

    const openApiJson = JSON.stringify(openApi, null, 2);
    fs.writeFileSync("./openapi.json", openApiJson);

    //console.log(openApiPaths);
    //console.log(openApiComponents);

    // if (true) return;

    const api_group = {
        api_group: endpoints
    }
    const endpointsJson = JSON.stringify(api_group, null, 2);
    fs.writeFileSync("./endpoint.json", endpointsJson);

    //console.log(endpointsJson);
}

async function parseEndpointData(data, filters) {
    let result = [];

    const refs = [];

    for (const path in data.paths) {
        //console.log("path:", path)
        const verbs = data.paths[path];
        for (const verb in verbs) {
            // console.log("  verb:", verb)
            const entry = {
                path: path,
                verb: verb,
                is_collection: false,
                params: []
            }
            const data = verbs[verb];

            // filter
            let filtered = false;
            if (filters.length > 0) {
                for (const filter of filters) {
                    if (data.hasOwnProperty(filter)) {
                        console.log("removing " + verb.toUpperCase() + ": " + path);
                        filtered = true;
                        break;
                    }
                }
            }
            if(filtered) {
                continue;
            }

            if (data.hasOwnProperty("parameters")) {
                const params = data["parameters"];

                for (const param of params) {
                    if (param.hasOwnProperty("in") && param["in"] === "path") {
                        const name = param["name"];
                        const required = param["required"];
                        // console.log("    name:", name, "required:", required);

                        let item = {
                            name: name,
                            required: required
                        }
                        entry.params.push(item);
                    }
                }
            }

            if (data.hasOwnProperty("requestBody")) {
                const requestBody = data["requestBody"];

                if (requestBody.hasOwnProperty("content")) {
                    for (const contentType in requestBody["content"]) {
                        if (requestBody["content"][contentType].hasOwnProperty("schema")) {
                            if (requestBody["content"][contentType]["schema"].hasOwnProperty("$ref")) {
                                const ref = requestBody["content"][contentType]["schema"]["$ref"];
                                if (ref.toLowerCase().startsWith("http")) {
                                    throw "open api with external http/https ref not supported"
                                }
                                //console.log("ref: ", ref);
                                if (!refs.includes(ref)) {
                                    refs.push(ref);
                                }
                            }
                        }
                    }
                }
            }
            if (data.hasOwnProperty("responses")) {

                const responses = data["responses"];
                for (const statusCodes in responses) {
                    if (responses[statusCodes].hasOwnProperty("content")) {
                        for (const contentType in responses[statusCodes]["content"]) {
                            if (responses[statusCodes]["content"][contentType].hasOwnProperty("schema")) {

                                if (responses[statusCodes]["content"][contentType]["schema"].hasOwnProperty("type")) {
                                    if (responses[statusCodes]["content"][contentType]["schema"]["type"].toLowerCase() === "array") {
                                        // console.log("is array response");
                                        entry.is_collection = true;
                                    }
                                }

                                if (responses[statusCodes]["content"][contentType]["schema"].hasOwnProperty("items")) {
                                    if (responses[statusCodes]["content"][contentType]["schema"]["items"].hasOwnProperty("$ref")) {
                                        const ref = responses[statusCodes]["content"][contentType]["schema"]["items"]["$ref"];
                                        if (ref.toLowerCase().startsWith("http")) {
                                            throw "open api with external http/https ref not supported"
                                        }
                                        //console.log("ref: ", ref);
                                        if (!refs.includes(ref)) {
                                            refs.push(ref);
                                        }
                                    }
                                }

                                if (responses[statusCodes]["content"][contentType]["schema"].hasOwnProperty("$ref")) {
                                    const ref = responses[statusCodes]["content"][contentType]["schema"]["$ref"];
                                    if (ref.toLowerCase().startsWith("http")) {
                                        throw "open api with external http/https ref not supported"
                                    }
                                    //console.log("ref: ", ref);
                                    if (!refs.includes(ref)) {
                                        refs.push(ref);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            result.push(entry);

            if(!openApiPaths.hasOwnProperty(path)) {
                openApiPaths[path] = {};
            }
            openApiPaths[path][verb] = verbs[verb];
        }
    }

    // we only need some of this
    // if (data.hasOwnProperty("components") && data.components.hasOwnProperty("schemas")) {
    //     for (const name in data.components.schemas) {
    //         const schema = data.components.schemas[name];
    //         if (schema.hasOwnProperty("properties")) {
    //             for (const property in schema["properties"]) {
    //                 if (schema["properties"][property].hasOwnProperty("$ref")) {
    //                     const ref = schema["properties"][property]["$ref"];
    //                     console.log(ref);
    //                 }
    //             }
    //         }
    //     }
    // }

    const refsProcessed = [];

    while (refs.length > 0) {
        const currentRef = refs.shift();
        refsProcessed.push(currentRef);

        // #/components/schemas/NameWeWantToHave
        const schemaName = currentRef.substring(currentRef.lastIndexOf('/') + 1);
        const schema = data.components.schemas[schemaName];

        if (schema.hasOwnProperty("properties")) {
            for (const property in schema["properties"]) {
                if (schema["properties"][property].hasOwnProperty("$ref")) {
                    const ref = schema["properties"][property]["$ref"];
                    if (!refsProcessed.includes(ref) && !refs.includes(ref)) {
                        // push subchild to loop we dont't know
                        refs.push(ref);
                    }
                }
            }
        }

        if (openApiComponents.hasOwnProperty(schemaName)) {
            // duplicated data - check if it is equal
            const existingSchemaStr = JSON.stringify(openApiComponents[schemaName], null, 2);
            const schemaStr = JSON.stringify(schema, null, 2);

            if (existingSchemaStr !== schemaStr) {
                // TODO: add some renaming here
                throw "schemaName: " + schemaName + " already exist with different specs";
            }
        }

        openApiComponents[schemaName] = schema;
    }

    // special handling of securitySchemes
    if (data.hasOwnProperty("components") &&
        data.components.hasOwnProperty("securitySchemes")) {

        for (const securitySchemeName in data.components.securitySchemes) {
            const securityScheme = data.components.securitySchemes[securitySchemeName];

            if (openApiSecuritySchemes.hasOwnProperty(securitySchemeName)) {
                // duplicated data - check if it is equal
                const existingSchemaStr = JSON.stringify(openApiSecuritySchemes[securitySchemeName], null, 2);
                const schemaStr = JSON.stringify(schema, null, 2);

                if (existingSchemaStr !== schemaStr) {
                    // TODO: add some renaming here
                    throw "securitySchemeName: " + securitySchemeName + " already exist with different specs";
                }
            }
            openApiSecuritySchemes[securitySchemeName] = securityScheme;
        }
    }

    return result;
}

try {
    parse('./config.json');
}
catch (err) {
    console.error(err);
}
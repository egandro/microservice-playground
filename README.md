# Microservices

This is an example of creating an API-Gateway for microservices with as less effort as possible. We use a declarative only approach with as little configuration files as possible.

What are microservices? What is an API-Gateway? Why do I want all of this? Check this article <https://microservices.io/>.

## What problem does this software solve?

In the real world, we write our REST microservice in Go, DotNet Core, TypeScript, Java, JavaScript or any other super cool language.

Usually, we also integrate OpenAPI <https://www.openapis.org/> for automatically creating documentation and specification of our API.

"Don't repeat yourself!" is a very good software design pattern. When it comes to the API-Gateway we also want to stick with this. Usually this isn't possible and we write a lot of manual routes for Nginx/Apache reverse proxies.

What can we do?

There is KrakenD <https://www.krakend.io/> a very nice and easy to use API-Gateway software. It is easy to configure and solves many things, that Nginx and Apache don't solve out of the box. However, it can't read the specification from OpenAPI Json files.

This project adds a code generator, that will create KranenD endpoints and joined OpenAPI document from your microservices OpenAPI specification.

It also allows filtering internal methods (by using official OpenAPI Extension tags <https://swagger.io/docs/specification/openapi-extensions/>). Filtered methods are not published to the KrakenD API-Gateway.

It also creates a joined OpenAPI document with specifications from all of your microservices. This document can be used, e.g. for your frontend team or your mobile team to create client services. This is a non-trivial approach. We have to take care about OpenAPI security entries and also remove filtered request/response schemas from the joined document.


## Demo Architecture

The sample application consists of a bunch dockered microservices written in different technology. They all provide some hello world nonsense services. Please check the <CREDITS.md> file.

![Architecture](docs/architecture.png)






using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Linq;

// officialy supported by open api specification:
// https://swagger.io/docs/specification/openapi-extensions/

namespace dotnetapi.OpenAPI
{
    public class OpenApiExtensionsFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var list = context.ApiDescription.CustomAttributes().Where(x => x.GetType() == typeof(OpenApiExtensionAttribute))
                .Select(x => (OpenApiExtensionAttribute)x).ToList();

            foreach(var item in list)
            {
                var attr = item as OpenApiExtensionAttribute;

                if ( attr.Value.GetType().Equals(typeof(bool)))
                {
                    operation.Extensions.Add(attr.Name, new OpenApiBoolean((bool)attr.Value));
                }
                else if (attr.Value.GetType().Equals(typeof(int)))
                {
                    operation.Extensions.Add(attr.Name, new OpenApiInteger((int)attr.Value));
                }
                else if (attr.Value.GetType().Equals(typeof(float)) || attr.Value.GetType().Equals(typeof(double)))
                {
                    operation.Extensions.Add(attr.Name, new OpenApiDouble((double)attr.Value));
                }
                else
                {
                    operation.Extensions.Add(attr.Name, new OpenApiString(attr.Value.ToString()));
                }
            }
        }
    }

}

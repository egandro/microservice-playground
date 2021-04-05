using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// officialy supported by open api specification:
// https://swagger.io/docs/specification/openapi-extensions/

namespace dotnetapi.OpenAPI
{
    public class OpenApiExtensionAttribute : Attribute
    {
        public string Name { get; }
        public object Value { get; }


        public OpenApiExtensionAttribute(string name, bool value)
        {
            Name = name;
            Value = value;
        }


        public OpenApiExtensionAttribute(string name, int value)
        {
            Name = name;
            Value = value;
        }

        public OpenApiExtensionAttribute(string name, float value)
        {
            Name = name;
            Value = value;
        }

        public OpenApiExtensionAttribute(string name, double value)
        {
            Name = name;
            Value = value;
        }

        public OpenApiExtensionAttribute(string name, string value)
        {
            Name = name;
            Value = value;
        }

    }
}

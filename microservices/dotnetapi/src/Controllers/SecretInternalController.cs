using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapi.OpenAPI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace dotnetapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SecretInternalController : ControllerBase
    {
        private readonly ILogger<SecretInternalController> _logger;

        public SecretInternalController(ILogger<SecretInternalController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [OpenApiExtension("x-internal", true)]
        public string Get()
        {
            return "I am very secret";
        }
    }
}

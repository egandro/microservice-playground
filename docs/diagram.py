from diagrams import Cluster, Diagram
from diagrams.custom import Custom

from diagrams.programming.framework import Spring
from diagrams.programming.language import Csharp
from diagrams.programming.language import Go
from diagrams.programming.language import Typescript
from diagrams.generic.device import Mobile
from diagrams.generic.os import Windows

with Diagram("Architecture", show=False, direction="BT"):
    api_gateway = Custom("API-Gateway\n(KrakenD)", "./pics/krakend.png")

    with Cluster("\nMicrosrvices"):
        microservices = [
            Go("advanced"),
            Csharp("dotnetapi"),
            Go("greeter"),
            Go("mathservice"),
            Spring("springapi"),
            Go("task-api"),
            Typescript("tsoaapi")]

    with Cluster("Application Layer"):
        application = [
            Mobile("Mobile"),
            Windows("Browser")]

    openapi = Custom("OpenAPI", "./pics/openapi.png")

    api_gateway >> microservices
    api_gateway >> openapi
    application >> api_gateway

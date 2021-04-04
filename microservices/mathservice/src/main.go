package main

import (
	"context"
	"log"
	"net/http"
	"time"
    "flag"
	"fmt"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/swaggest/openapi-go/openapi3"
	"github.com/swaggest/rest"
	"github.com/swaggest/rest/chirouter"
	"github.com/swaggest/rest/jsonschema"
	"github.com/swaggest/rest/nethttp"
	"github.com/swaggest/rest/openapi"
	"github.com/swaggest/rest/request"
	"github.com/swaggest/rest/response"
	"github.com/swaggest/rest/response/gzip"
	"github.com/swaggest/swgui/v3cdn"
	"github.com/swaggest/usecase"
	"github.com/swaggest/usecase/status"
)

func main() {
	portPtr := flag.Int("port", 8080, "webserver port")

	// Init API documentation schema.
	apiSchema := &openapi.Collector{}
	apiSchema.Reflector().SpecEns().Info.Title = "Math Service"
	apiSchema.Reflector().SpecEns().Info.WithDescription("This app showcases a trivial REST API.")
	apiSchema.Reflector().SpecEns().Info.Version = "v1.2.3"
	// apiSchema.Reflector().SpecEns().MapOfAnything = map[string]interface{}{
	// 	"x-stuff": "bar",
	// }

	// Setup request decoder and validator.
	validatorFactory := jsonschema.NewFactory(apiSchema, apiSchema)
	decoderFactory := request.NewDecoderFactory()
	decoderFactory.ApplyDefaults = true
	decoderFactory.SetDecoderFunc(rest.ParamInPath, chirouter.PathToURLValues)

	// Create router.
	r := chirouter.NewWrapper(chi.NewRouter())

	// Setup middlewares.
	r.Use(
		middleware.Recoverer,                          // Panic recovery.
		nethttp.OpenAPIMiddleware(apiSchema),          // Documentation collector.
		request.DecoderMiddleware(decoderFactory),     // Request decoder setup.
		request.ValidatorMiddleware(validatorFactory), // Request validator setup.
		response.EncoderMiddleware,                    // Response encoder setup.
		gzip.Middleware,                               // Response compression with support for direct gzip pass through.
	)

	createAddMethod(r)
	createSubMethod(r)
	createMulMethod(r)

	// Swagger UI endpoint at /docs.
	r.Method(http.MethodGet, "/docs/openapi.json", apiSchema)
	r.Mount("/docs", v3cdn.NewHandler(apiSchema.Reflector().Spec.Info.Title,
		"/docs/openapi.json", "/docs"))

	// Start server.

	log.Println(fmt.Sprintf("http://localhost:%v/docs", *portPtr))
	if err := http.ListenAndServe(fmt.Sprintf(":%v",*portPtr), r); err != nil {
		log.Fatal(err)
	}
}

func createAddMethod(r *chirouter.Wrapper) {
	// Declare input port type.
	type addInput struct {
		A int `path:"a"`
		B int `path:"b"`
	}

	// Declare output port type.
	type addOutput struct {
		Now    time.Time `header:"X-Now" json:"-"`
		Result int       `json:"result"`
	}

	// Create use case interactor with references to input/output types and interaction function.
	u := usecase.NewIOI(new(addInput), new(addOutput), func(ctx context.Context, input, output interface{}) error {
		var (
			in  = input.(*addInput)
			out = output.(*addOutput)
		)

		out.Result = in.A + in.B
		out.Now = time.Now()

		return nil
	})

	// Describe use case interactor.
	u.SetTitle("Add")
	u.SetDescription("Add two integers.")
	//u.SetTags("API-Gateway")

	u.SetExpectedErrors(status.InvalidArgument)

	// Add use case handler to router.
	r.Method(http.MethodGet, "/api/add/{a}/{b}", nethttp.NewHandler(u))
}

func createSubMethod(r *chirouter.Wrapper) {
	// Declare input port type.
	type subInput struct {
		A int `path:"a"`
		B int `path:"b"`
	}

	// Declare output port type.
	type subOutput struct {
		Now    time.Time `header:"X-Now" json:"-"`
		Result int       `json:"result"`
	}

	// Create use case interactor with references to input/output types and interaction function.
	u := usecase.NewIOI(new(subInput), new(subOutput), func(ctx context.Context, input, output interface{}) error {
		var (
			in  = input.(*subInput)
			out = output.(*subOutput)
		)

		out.Result = in.A - in.B
		out.Now = time.Now()

		return nil
	})

	// Describe use case interactor.
	u.SetTitle("Sub")
	u.SetDescription("Sub two integers.")
	//u.SetTags("API-Gateway")

	u.SetExpectedErrors(status.InvalidArgument)

	// Add use case handler to router.
	r.Method(http.MethodGet, "/api/sub/{a}/{b}", nethttp.NewHandler(u))
}

func createMulMethod(r *chirouter.Wrapper) {
	// Declare input port type.
	type mulInput struct {
		A int `path:"a"`
		B int `path:"b"`
	}

	// Declare output port type.
	type mulOutput struct {
		Now    time.Time `header:"X-Now" json:"-"`
		Result int       `json:"result"`
	}

	// Create use case interactor with references to input/output types and interaction function.
	u := usecase.NewIOI(new(mulInput), new(mulOutput), func(ctx context.Context, input, output interface{}) error {
		var (
			in  = input.(*mulInput)
			out = output.(*mulOutput)
		)

		out.Result = in.A * in.B
		out.Now = time.Now()

		return nil
	})

	// Describe use case interactor.
	u.SetTitle("Mul")
	u.SetDescription("Mul two integers.")
	// u.SetTags("API-Gateway") // no export!

	u.SetExpectedErrors(status.InvalidArgument)

	// Add use case handler to router.
	r.Method(http.MethodGet, "/api/mul/{a}/{b}", nethttp.NewHandler(u,
		// Annotate operation to add post processing if necessary.
		nethttp.AnnotateOperation(func(op *openapi3.Operation) error {
			op.WithMapOfAnythingItem("x-internal", true)
			return nil
		})))
}

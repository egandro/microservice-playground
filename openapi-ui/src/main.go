package main

import (
	"flag"
	"github.com/gobike/envflag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/swaggest/swgui/v3emb" // For go1.16 or later.
)

// no cache - https://stackoverflow.com/questions/33880343/go-webserver-dont-cache-files-using-timestamp
// https://github.com/zenazn/goji/blob/master/web/middleware/nocache.go

// Unix epoch time
var epoch = time.Unix(0, 0).Format(time.RFC1123)

// Taken from https://github.com/mytrile/nocache
var noCacheHeaders = map[string]string{
	"Expires":         epoch,
	"Cache-Control":   "no-cache, private, max-age=0",
	"Pragma":          "no-cache",
	"X-Accel-Expires": "0",
}

var etagHeaders = []string{
	"ETag",
	"If-Modified-Since",
	"If-Match",
	"If-None-Match",
	"If-Range",
	"If-Unmodified-Since",
}

// NoCache is a simple piece of middleware that sets a number of HTTP headers to prevent
// a router (or subrouter) from being cached by an upstream proxy and/or client.
//
// As per http://wiki.nginx.org/HttpProxyModule - NoCache sets:
//      Expires: Thu, 01 Jan 1970 00:00:00 UTC
//      Cache-Control: no-cache, private, max-age=0
//      X-Accel-Expires: 0
//      Pragma: no-cache (for HTTP/1.0 proxies/clients)
func noCache(h http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {

		// Delete any ETag headers that may have been set
		for _, v := range etagHeaders {
			if r.Header.Get(v) != "" {
				r.Header.Del(v)
			}
		}

		// Set our NoCache headers
		for k, v := range noCacheHeaders {
			w.Header().Set(k, v)
		}

		h.ServeHTTP(w, r)
	}

	return http.HandlerFunc(fn)
}

func main() {
    var (
        name string
		portPtr *int
    )

	flag.StringVar(&name, "API_NAME", "My API", "name of the API")
    envflag.Parse()

	portPtr = flag.Int("port", 8080, "webserver port")

	http.Handle("/docs/", noCache(v3emb.NewHandler(name, "/docs/static/openapi.json", "/docs/")))
	http.Handle("/docs/static/", noCache(http.StripPrefix("/docs/static/", http.FileServer(http.Dir("./public")))))

	log.Println(fmt.Sprintf("http://localhost:%v/docs", *portPtr))

	err := http.ListenAndServe(fmt.Sprintf(":%v", *portPtr), nil)
	if err != nil {
		log.Fatal(err)
	}
}

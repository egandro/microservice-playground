package main

import (
	"log"
    "flag"
	"fmt"
	"net/http"
)

func main() {
	portPtr := flag.Int("port", 8080, "webserver port")

	log.Println(fmt.Sprintf("http://localhost:%v/docs", *portPtr))
	if err := http.ListenAndServe(fmt.Sprintf(":%v",*portPtr), NewRouter()); err != nil {
		log.Fatal(err)
	}
}

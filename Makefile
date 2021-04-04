all:: krakend microservices openapi-ui

.PHONY: krakend
krakend:
	cd krakend && make

.PHONY: microservices
microservices:
	cd microservices && make

.PHONY: openapi-ui
krakend:
	cd openapi-ui && make

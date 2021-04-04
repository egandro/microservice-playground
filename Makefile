all:: krakend microservices

.PHONY: krakend
krakend:
	cd krakend && make

.PHONY: microservices
microservices:
	cd microservices && make
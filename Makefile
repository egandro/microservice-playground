all:: config genconfig krakend microservices openapi-ui

config:
	cp -r templates/config-tpl config

.PHONY: genconfig
genconfig:
	cd genconfig && make

.PHONY: krakend
krakend:
	cd krakend && make

.PHONY: microservices
microservices:
	cd microservices && make

.PHONY: openapi-ui
krakend:
	cd openapi-ui && make

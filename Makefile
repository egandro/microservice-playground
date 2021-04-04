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
openapi-ui:
	cd openapi-ui && make

check-config:
	docker rm -f krakend_check || echo ""
	docker run --name krakend_check -v $$(pwd)/config/krakend:/config krakend:latest check

run:
	docker rm -f krakend || echo ""
	docker run --name krakend -v $$(pwd)/config/krakend:/config -p 8080:8080 krakend:latest

stop:
	docker rm -f krakend || echo ""
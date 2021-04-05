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
	@docker rm -f krakend_check 2>/dev/null || echo ""
	docker run -it --name krakend_check -v $$(pwd)/config/krakend:/config krakend:latest check

update-config: stop-krakend
	@echo "make sure the microservices are running"
	@docker rm -f genconfig 2>/dev/null || echo ""
	docker run -it --name genconfig -v $$(pwd):/work genconfig:latest run -c /work/microservices/api-gateway.json -e /work/config/krakend/settings/endpoint.json -o /work/config/swagger-ui/openapi.json

run-krakend: stop-krakend
	docker run -it --name krakend -v $$(pwd)/config/krakend:/config -p 8080:8080 -p 8090:8090 krakend:latest

stop-krakend:
	@docker rm -f krakend 2>/dev/null || echo ""
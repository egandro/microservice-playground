all:: advanced dotnetapi greeter mathservice task-api

.PHONY: advanced
advanced:
	cd advanced && make

.PHONY: dotnetapi
dotnetapi:
	cd dotnetapi && make

.PHONY: greeter
greeter:
	cd greeter && make

.PHONY: mathservice
mathservice:
	cd mathservice && make

.PHONY: task-api
task-api:
	cd task-api && make

.PHONY: run
run: all stop
	docker-compose up || echo ""

.PHONY: stop
stop:
	docker-compose stop || echo ""
	docker-compose rm -f || echo ""
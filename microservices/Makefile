all:: advanced dotnetapi greeter mathservice springapi task-api tsoaapi

.PHONY: run
run: all stop
	docker-compose up || echo ""

.PHONY: stop
stop:
	docker-compose stop || echo ""
	docker-compose rm -f || echo ""

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

.PHONY: springapi
springapi:
	cd springapi && make

.PHONY: task-api
task-api:
	cd task-api && make

.PHONY: tsoaapi
tsoaapi:
	cd tsoaapi && make
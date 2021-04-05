SERVICE=python-diagrams

all:: build diagrams

build:
	docker build -t $(SERVICE):latest .

.PHONY: diagrams
diagrams:
	@docker rm -f python-diagrams 2>/dev/null
	docker run -it --name python-diagrams -v $$(pwd):/work python-diagrams:latest run ./diagram.py


clean:
	docker rmi -f $(SERVICE)
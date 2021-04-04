SERVICE=krakend

all:: build

build: krakend-ce krakend container

krakend-ce:
	git clone https://github.com/devopsfaith/krakend-ce.git || echo ""
	@# we don't do make docker_build
	cd krakend-ce && make build || echo ""

krakend:
	cp krakend-ce/krakend .
	strip krakend

container:
	docker build -t $(SERVICE):latest .
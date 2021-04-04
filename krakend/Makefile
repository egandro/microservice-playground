SERVICE=krakend

all:: build container

build: krakend

krakend: krakend-ce/krakend
	git clone https://github.com/devopsfaith/krakend-ce.git || echo ""
	@# we don't do make docker_build
	cd krakend-ce && make build || echo ""
	cp krakend-ce/krakend .
	strip krakend

container: krakend
	docker build -t $(SERVICE):latest .
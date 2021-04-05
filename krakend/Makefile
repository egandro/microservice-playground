SERVICE=krakend

all:: build

build: krakend-ce krakend container reflex-dir reflex

krakend-ce:
	git clone https://github.com/devopsfaith/krakend-ce.git || echo ""
	@# we don't do make docker_build
	cd krakend-ce && make build || echo ""

krakend:
	cp krakend-ce/krakend .
	strip krakend

reflex-dir:
	git clone https://github.com/cespare/reflex.git reflex-dir || echo ""
	cd reflex-dir && go build . || echo ""

reflex:
	cp reflex-dir/reflex .
	strip reflex

container:
	docker build -t $(SERVICE):latest .
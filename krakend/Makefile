SERVICE=krakend

all:: build

build: krakend-ce krakend reflex-dir reflex container

# we don't do make docker_build
krakend-ce:
	git clone https://github.com/devopsfaith/krakend-ce.git || echo ""
	cd krakend-ce && git reset --hard f77ed77
	cd krakend-ce && make build || echo ""

krakend:
	cp krakend-ce/krakend .
	strip krakend

reflex-dir:
	git clone https://github.com/cespare/reflex.git reflex-dir || echo ""
	cd reflex-dir && git reset --hard 456b371
	cd reflex-dir && go build . || echo ""

reflex:
	cp reflex-dir/reflex .
	strip reflex

clean:
	rm -rf krakend-ce krakend reflex-dir reflex

container:
	docker build -t $(SERVICE):latest .
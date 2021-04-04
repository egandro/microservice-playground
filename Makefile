all:: krakend

krakend:
	git clone https://github.com/devopsfaith/krakend-ce.git || echo ""
	@# we don't do make docker_build
	cd krakend-ce && make build || echo ""
	cp krakend-ce/krakend .

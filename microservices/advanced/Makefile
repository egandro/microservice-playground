SERVICE=advanced

build:
	@#cd src && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix $(SERVICE) -o ../$(SERVICE) .
	docker build -t $(SERVICE):latest .

clean:
	rm -f $(SERVICE)
	docker rmi -f $(SERVICE)
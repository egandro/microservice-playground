SERVICE=task-api

build:
	docker build -t $(SERVICE):latest .

clean:
	rm -f $(SERVICE)
	docker rmi -f $(SERVICE)
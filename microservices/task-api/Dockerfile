###############################################################
# Builder
###############################################################
FROM golang:latest

WORKDIR /go/src/task-api.example.com/

COPY src .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix task-api -o task-api cmd/task-api/main.go

###############################################################
# Runner
###############################################################
FROM debian:buster

WORKDIR /root/
COPY --from=0 /go/src/task-api.example.com/task-api .

EXPOSE 8080
CMD ["./task-api"]

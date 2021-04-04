###############################################################
# Builder
###############################################################
FROM golang:latest

WORKDIR /go/src/greeter.example.com/

COPY src .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix greeter -o greeter .

###############################################################
# Runner
###############################################################
FROM debian:buster

WORKDIR /root/
COPY --from=0 /go/src/greeter.example.com/greeter .

EXPOSE 8080
CMD ["./greeter"]

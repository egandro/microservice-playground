###############################################################
# Builder
###############################################################
FROM golang:latest

WORKDIR /go/src/mathservice.example.com/

COPY src .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix mathservice -o mathservice .

###############################################################
# Runner
###############################################################
FROM debian:buster

WORKDIR /root/
COPY --from=0 /go/src/mathservice.example.com/mathservice .

EXPOSE 8080
CMD ["./mathservice"]

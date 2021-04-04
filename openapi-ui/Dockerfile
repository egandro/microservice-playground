###############################################################
# Builder
###############################################################
FROM golang:latest

WORKDIR /go/src/openapi-ui.example.com/

COPY src .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix openapi-ui -o openapi-ui .

###############################################################
# Runner
###############################################################
FROM debian:buster

WORKDIR /root/
COPY --from=0 /go/src/openapi-ui.example.com/openapi-ui .

COPY ./run.sh .
RUN chmod 755 ./run.sh

EXPOSE 8080
CMD ["./run.sh"]

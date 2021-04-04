###############################################################
# Builder
###############################################################
FROM golang:latest

WORKDIR /go/src/advanced.example.com/

COPY src .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix advanced -o advanced .

###############################################################
# Runner
###############################################################
FROM debian:buster

WORKDIR /root/
COPY --from=0 /go/src/advanced.example.com/advanced .

EXPOSE 8080
CMD ["./advanced"]

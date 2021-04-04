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
RUN apt-get update \
    && apt-get install -y -qqq libicu63 \
    && rm -rf /var/lib/apt/lists/*

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_DETAILEDERRORS=1
ENV ASPNETCORE_SHUTDOWNTIMEOUTSECONDS=3

WORKDIR /root/
EXPOSE 8080
COPY publish .

CMD ["./dotnetapi"]

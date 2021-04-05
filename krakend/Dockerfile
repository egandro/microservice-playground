###############################################################
# Builder
###############################################################
FROM golang:latest

WORKDIR /go

RUN git clone  https://github.com/cespare/reflex.git \
	&& cd reflex \
    && git reset --hard 456b371 \
	&& go build . \
    && strip reflex

RUN git clone https://github.com/devopsfaith/krakend-ce.git \
	&& cd krakend-ce \
    && git reset --hard f77ed77 \
	&& make build \
    && strip krakend

###############################################################
# Runner
###############################################################
FROM debian:buster

WORKDIR /

COPY ./run.sh /usr/local/bin/run
RUN chmod 755 /usr/local/bin/run

COPY ./check.sh /usr/local/bin/check
RUN chmod 755 /usr/local/bin/check

COPY --from=0 /go/reflex/reflex .
COPY --from=0 /go/krakend-ce/krakend .

CMD ["/usr/local/bin/run"]

FROM debian:buster

WORKDIR /

COPY ./run.sh /usr/local/bin/run
RUN chmod 755 /usr/local/bin/run

COPY ./check.sh /usr/local/bin/check
RUN chmod 755 /usr/local/bin/check

COPY ./krakend .
CMD ["/usr/local/bin/run"]

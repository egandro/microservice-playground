FROM debian:buster

WORKDIR /root/

COPY ./run.sh .
RUN chmod 755 ./run.sh

COPY ./krakend .
CMD ["./run.sh"]

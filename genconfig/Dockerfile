FROM node:buster

WORKDIR /root/
COPY src .

RUN npm install

COPY ./run.sh /usr/local/bin/run
RUN chmod 755 /usr/local/bin/run
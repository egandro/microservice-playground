FROM node:buster

WORKDIR /root/
COPY src .

RUN npm install

COPY ./run.sh .
RUN chmod 755 ./run.sh

CMD ["./run.sh"]

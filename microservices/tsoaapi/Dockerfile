FROM node:buster

WORKDIR /root/
COPY src .

RUN yarn \
    && yarn run build

CMD ["yarn", "run", "start"]
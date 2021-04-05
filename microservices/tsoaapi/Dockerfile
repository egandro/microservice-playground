FROM node:buster

WORKDIR /root/
COPY src .

EXPOSE 8080
ENV PORT=8080

RUN yarn \
    && yarn run build

CMD ["yarn", "run", "start"]
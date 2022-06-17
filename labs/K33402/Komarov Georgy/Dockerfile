FROM node:16-alpine

RUN apk add --update --no-cache python3-dev build-base

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm serve && npm i

COPY ../../.. .
RUN npm run build

CMD npm run migrate && npm run swagger-autogen && NODE_ENV=production node dist/index.js

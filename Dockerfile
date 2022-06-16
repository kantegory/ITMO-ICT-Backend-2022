FROM node:16-alpine

RUN apk add --update --no-cache make

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm serve && npm i

COPY . .
RUN npm run build

CMD make migrate && make swagger && make run

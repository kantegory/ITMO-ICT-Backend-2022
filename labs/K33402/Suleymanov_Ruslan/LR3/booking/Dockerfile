# syntax=docker/dockerfile:1

FROM node:17.3.0
ENV NODE_ENV=production

WORKDIR /booking

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install -P

COPY . .

RUN yarn tsc
CMD [ "node", "dist/index.js" ]
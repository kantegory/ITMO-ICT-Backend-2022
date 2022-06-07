FROM node:16

WORKDIR /app/base

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
FROM node:16

WORKDIR /app/auth

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8100

CMD [ "npm", "start" ]
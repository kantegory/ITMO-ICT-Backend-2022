FROM node:16

WORKDIR /app/main

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]
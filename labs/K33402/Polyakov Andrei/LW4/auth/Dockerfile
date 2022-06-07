FROM node:16

WORKDIR /app/auth

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8180

CMD [ "npm", "start" ]
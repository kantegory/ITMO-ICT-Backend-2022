FROM node:latest

WORKDIR app/Restaurants

COPY package.json .

COPY . .

RUN npm install

EXPOSE 9000

CMD ["npm", "start"]
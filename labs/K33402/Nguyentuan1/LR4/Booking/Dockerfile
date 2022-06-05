FROM node

WORKDIR /app/Booking

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]
FROM node:16

WORKDIR /app/hotel

COPY . /app/hotel

RUN npm install
RUN npm uninstall --save sqlite3 
RUN npm install --save sqlite3

EXPOSE 9000

CMD ["npm", "start"]

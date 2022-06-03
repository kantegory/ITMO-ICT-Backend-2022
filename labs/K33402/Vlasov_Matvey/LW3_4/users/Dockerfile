FROM node:12
WORKDIR /app/users/
COPY package.json /app/users/package.json
RUN npm install
COPY . .
EXPOSE 8002
CMD ["npm", "start"]
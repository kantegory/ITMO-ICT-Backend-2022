FROM node:12
WORKDIR /app/hotels/
COPY package.json /app/hotels/package.json
RUN npm install
COPY . .
EXPOSE 8001
CMD ["npm", "start"]
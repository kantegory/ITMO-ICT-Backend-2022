FROM node:18-alpine
WORKDIR /home/app
COPY package.json /home/app/package.json
COPY package-lock.json /home/app/package-lock.json
RUN npm ci
COPY . /home/app
RUN npm run build

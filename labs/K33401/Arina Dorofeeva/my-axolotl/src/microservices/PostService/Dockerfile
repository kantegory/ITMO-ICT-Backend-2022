FROM node:14-alpine as base

WORKDIR /app
COPY . ./
RUN npm ci
EXPOSE 8081
CMD ["npm", "run", "start-post"]

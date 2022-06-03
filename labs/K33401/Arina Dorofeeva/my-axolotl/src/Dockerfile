FROM node:14-alpine as base

WORKDIR /app
COPY . ./
RUN echo $(ls)
RUN npm ci
EXPOSE 8080
CMD ["npm", "run", "start"]

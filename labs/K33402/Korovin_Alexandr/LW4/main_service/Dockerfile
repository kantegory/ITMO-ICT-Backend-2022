FROM node:latest

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

CMD [ "npm", "run", "start" ]

EXPOSE 5000 


FROM node:17.9.0

USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
WORKDIR /home/node

COPY package.json .

RUN npm install --only=production && npm cache clean --force

COPY . .

FROM node:16
ADD package.json /express_gateway/package.json
RUN cd /express_gateway && npm install
ADD ./ /express_gateway
CMD cd /express_gateway && npm start server
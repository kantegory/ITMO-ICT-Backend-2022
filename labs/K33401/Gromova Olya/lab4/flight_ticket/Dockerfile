FROM node:16
ADD package.json /flight_ticket/package.json
RUN cd /flight_ticket && npm install
ADD ./ /flight_ticket
CMD cd /flight_ticket && npm run start
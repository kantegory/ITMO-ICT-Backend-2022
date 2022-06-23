FROM node:16
ADD package.json /user/package.json
RUN cd /user && npm install
ADD ./ /user
CMD cd /user && npm run start
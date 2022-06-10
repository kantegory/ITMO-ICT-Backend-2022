#! /bin/bash
cd dist
# Allow to fail
npm sequelize db:seed:all || true
node index.js

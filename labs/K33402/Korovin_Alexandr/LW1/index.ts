import app from './src/app';

require('dotenv').config();
const {sequelize} = require("./src/db/models")
const port = process.env.PORT || 8000;
app.listen(port,async () => {
  await sequelize.sync({force:true})
  console.log(`Server Running on : http://localhost:${port}`);
});

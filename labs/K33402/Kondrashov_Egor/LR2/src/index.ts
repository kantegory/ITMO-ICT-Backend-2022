import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import { dbCreateConnection } from './orm/dbCreateConnection';
import routes from './routes';



export const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

(async () => {
  await dbCreateConnection();
})();

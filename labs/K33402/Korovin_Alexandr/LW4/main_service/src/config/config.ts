import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.lzfiu.mongodb.net/db`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;

const SECRET_KEY = process.env.SERVER_KEY  || "123";
const AUTH_HOST = process.env.AUTH_HOST || "auth_host";
const AUTH_PORT = process.env.AUTH_PORT || "5001";

export const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  },
  jwt:{
    key:SECRET_KEY
  },
  auth_service:{
    port:AUTH_PORT,
    host:AUTH_HOST
  }
};

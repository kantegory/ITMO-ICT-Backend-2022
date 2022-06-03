import {createConnection, Connection} from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export class db {
    static async getConnection(): Promise<Connection> {
        return await createConnection({
            type: "postgres",
            host: process.env.DATABASE_SERVER_HOST,
            port: +process.env.DATABASE_SERVER_PORT,
            username: process.env.DATABASE_SERVER_USERNAME,
            password: process.env.DATABASE_SERVER_PASSWORD,
            database: process.env.DATABASE_SERVER_DBNAME,
            entities: ["src/orm/models/*.ts"],
            synchronize: true,
            ssl: true,
            extra: { ssl: { rejectUnauthorized: false } }
        });
    }
}
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: true,
    name: 'default',
    entities: ['../models/**/*{.ts,.js}'],
    migrations: ['../migrations/**/*{.ts,.js}'],
    subscribers: ['../subscriber/**/*{.ts,.js}'],
})
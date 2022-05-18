import { ConnectionOptions } from 'typeorm'

const connectionOptions: ConnectionOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: false,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    name: 'default',
    entities: ['src/models/**/*{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscriber/**/*{.ts,.js}'],
}

export = connectionOptions
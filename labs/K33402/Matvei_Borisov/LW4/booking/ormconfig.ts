import 'dotenv/config'

export = {
    host: process.env.DB_HOST,
    type: `postgres`,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_USER,
    entities: [`dist/src/**/*.entity.js`],
    migrations: [`dist/migrations/*.ts`],
    cli: {
        migrationsDir: `migrations`,
    },
    synchronize: false,
}
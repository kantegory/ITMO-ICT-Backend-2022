import { DataSource } from "typeorm"

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: ['dist/models/**/*.js'],
    subscribers: [],
    migrations: ['dist/migrations/**/*.js'],
})

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized successfully")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

export default dataSource
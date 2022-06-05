import "reflect-metadata";
import App from "./core";
import {AppDataSource} from "./dataSource/data-source";


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const app = new App();
app.start();


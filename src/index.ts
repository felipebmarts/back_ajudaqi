import { DevDataSource } from "./connections/dbDev";
import express = require("express")
import router from "./routes/routes";



DevDataSource.initialize().then()
console.log("Database connected")

const app = express()
const cors = require('cors');

app.use(express.json())
app.use(cors({origin: "http://localhost:3000"}))
app.use(router)

app.listen(3333, () => console.log("Servidor online na porta 3333"))


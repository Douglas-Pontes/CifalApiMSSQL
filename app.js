const express = require("express")
const cors = require("cors")
const mssql = require("mssql")
const dotenv = require("dotenv")

const app = express()
dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require("./routes"))

var dbConfig = {
    server: process.env.HOST,
    port: 1433,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE,
    connectionTimeout: 150000,
    driver: "tedious",
    stream: false,
    options: {
        appName: 'CifalConferencia',
        encrypt: false
    },
    pool: {
        max: 20,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

mssql.connect(dbConfig).then(pool => {
    if (pool.connecting) {
        console.log("Connecting to the database...")
    }

    if (pool.connected) {
        app.listen(process.env.PORT || 3000)
    }

    return pool
}).catch(err => {
    console.log("Failed to connect to the database")
    console.log(err)
})

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.js'
import analysisRoutes from './routes/analysis.js'
import { Client } from "cassandra-driver"
import { checkConnection } from "./controllers/cassandra.js"

dotenv.config();
const app = express();
// const __dirname = path.resolve();


app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.static(path.join(__dirname + "/public")));
app.use(cors());


const PORT = process.env.PORT || 5000

// ***********AstraDb connection**************
async function run() {
    const client = new Client({
        cloud: {
            secureConnectBundle: "./public/secure-connect-angelhack.zip",
        },
        credentials: {
            username: process.env.CLIENT_ID,
            password: process.env.CLIENT_SECRET,
        },
    });

    await client.connect();

    // Execute a query
    const rs = await client.execute("SELECT * FROM system.local");
    console.log(`Your cluster returned ${rs.rowLength} row(s)`);
    checkConnection()

    // await client.shutdown();
}

// Run the async function
run();
//   ***************************************

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//define endpoint for all the routes in authRoutes.js and analysisRoutes.js
app.use('/user', authRoutes)
app.use('/analysis', analysisRoutes)


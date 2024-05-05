const express = require("express");
const {Server} = require("socket.io");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const key = fs.readFileSync("./certs/cert.key");
const cert = fs.readFileSync("./certs/cert.crt");

const expressServer = https.createServer({ key, cert }, app);


const io = new Server(expressServer);

const port = process.env.PORT || 20000;

expressServer.listen(port, () => {
    console.log("Server Running At Port ", port);
})
module.exports = { app, io };
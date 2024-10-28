const express = require("express");
const app = express();
const PORT = process.env.PORT; 
const { connect, closeClientConnect } = require('./prisma/client');



// connnect to db
connect();



export { app };
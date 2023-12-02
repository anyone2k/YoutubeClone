// CRUD 
// C. Create   POST   
// R. Read     GET     
// U. Update   PUT     
// D. Delete   DELETE  

//===============================================================\\

const express = require('express');
const dotenv = require("dotenv").config();
const colors = require('colors');
const connectDB = require('./config/db');
var cors = require('cors');

// Connecting the datebase
connectDB();

const app = express();

//
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// 
app.use(express.json());

// port assignement
const PORT = process.env.PORT || 5000;

// routes importing for further routing
const routesauth = require('./routes/auth');
const routesvideos = require('./routes/videos');


// routes usage
app.use(express.json());
app.use('/auth', routesauth);
app.use('/videos', routesvideos);




const server = app.listen(PORT, () => {
    console.log(`Server listen on port : ${PORT} and devmode: ${process.env.NODE_ENV}`.yellow.bold);
});

// Handling unhandled promise rejection

process.on('unhandledRejection', (err, promise) => {
    console.log(`=> Error: ${err.message}\n`.red.underline);
    //Close server & exit process
    server.close(() => process.exit(1));
});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const cors = require('cors');

const app = express();

// POST REQ
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'videos')));

// Access Api
/*
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
})*/

// Routers
var routers = require('./router/index');
app.use('/', routers);

app.listen(3000, ()=> {
    console.log("App is running at port 3000")
})

var express = require('express');
var app = express();
var mysql = require('mysql')

var hw8 = require("./hw8.js")

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hw8'
});
dbConn.connect();

app.locals.db = dbConn
app.use('/hw8', hw8)

app.listen(80,'0.0.0.0', () => {
    console.log('Listening...');
})
'use strict'
const { executeQuery } = require('./scripts/querys')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); //Crea una aplicacion de express
const morgan = require('morgan');
app.use(cors());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(function(req,res,next){
    //acceso a conexiones que requieran a esta conexion
    res.setHeader('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-type,Accept','application/json','text/json');
    res.header('Access-Control-Allow-Methods','GET','POST');
    next();
});
app.use('/api',require('./routes/api.routes'))

module.exports = app;

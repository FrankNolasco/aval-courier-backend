'use strict'
var mssql = require('mssql');
var app = require('./app')
var port =process.env.PORT || 5000
var config = require('./config/connection.json');
var connection = mssql.connect(config,(err,res) => {
    if(err){
        console.log('No se pudo conectar a la base de datos')
    }
    else{
        console.log('Conectado correctamente a la base de datos');
        app.listen(port,function(){
            console.log("api rest running on http://localhost:"+port);
        });
    }
});
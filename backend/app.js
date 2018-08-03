'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargamos archivo de rutas
var food_routes = require('./routes/food');
var user_routes = require('./routes/user');
var diary_routes = require('./routes/diary');


//middlewares
//para que todo lo que llegue por body lo convierta a un objeto json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas

app.use('/api', food_routes);
app.use('/api', user_routes);
app.use('/api', diary_routes);


module.exports = app;
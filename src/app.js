const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//Settings
//configurando el puerto de la aplicacion
app.set('port', 5002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//Routes
app.use(require('./routes/index'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler 
app.use((req, res, next) => {
    //enviar como respuesta
    res.status(404).send('404 not Found');
});

module.exports = app;
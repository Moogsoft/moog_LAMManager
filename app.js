var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var editor = require('./routes/editor');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, '/public/favicon.png')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', routes);
app.use('/editor', editor);
//app.post('/editor', editor);

/// error handlers
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    console.log('Error stack '+err.status+' '+err.message);
    console.log(req.body);
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    console.log('Client stack');
    if (req.xhr) {
        res.status(500).send({ error: 'Something blew up!' });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    console.log('Render stack');
    res.status(500);
    res.render('error', { error: err });
}

module.exports = app;

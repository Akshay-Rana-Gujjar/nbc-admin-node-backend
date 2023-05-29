var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileupload = require('express-fileupload');
const cors = require('cors');

var indexRouter = require('./routes/index');


const { esclient, checkConnection } = require("./elastic/connect");

const {initMongo, closeMongo} = require("./database/connect");

initMongo();

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload({
    createParentPath: true
}))

app.use('/api/v1/', indexRouter);

checkConnection();

process.on("beforeExit", ()=>{
    closeMongo();
})

module.exports = app;

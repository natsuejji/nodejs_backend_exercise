var http=require("http");

var express = require('express');
var path = require('path');
var logger = require('morgan');


var cardApi = require('./api/api')

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', cardApi);
app.get('/', function(req,res){
  res.render('index');
});
app.get(/^\/deck\/(\d+)$/, function(req,res){
  res.render('deck',{deckid: req.params[0]});
});
app.get('/select-class', function(req,res){
  res.render('select-class')
})
app.get(/^\/createDeck\/([aA-zZ]+)$/, function(req,res){
  res.render('new-deck',{seleClass: req.params[0]})
})

app.use(function(req,res){
  res.status(404).render('404')
})
http.createServer(app).listen(3000, function() {
    console.log("started on port 3000.");
});
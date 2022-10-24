var express = require('express');
var app = express();

// app.use('/', require('./index'));
app.use('/imdb/movies', require('./imdb/movies'));
app.use('/imdb/vote', require('./imdb/vote'));
app.use(express.static("public"));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/site.html');
})

app.listen('8080');

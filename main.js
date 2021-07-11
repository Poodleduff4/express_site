var express = require('express');
var app = express();

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'))

app.get('/users/list', function(req, res){
    res.send('piss and shit');
    console.log('piss and shit');
})

app.listen('3000');
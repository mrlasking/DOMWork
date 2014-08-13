var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

app.get('/test', function(req, res){

    console.log('GET:', req.param('test'));
    console.log('GET:', req.param('id'));

    res.send('[{"id": 1,"name": "getfirst"},{"id": 2,"name": "getsecond"}]');
});

app.post('/testPost', function(req, res){

    console.log('POST:', req.param('test'));
    console.log('POST:', req.param('id'));

    res.send('[{"id": 1,"name": "postfirst"},{"id": 2,"name": "postsecond"}]');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/dbs', function(err){
    if(err){
        console.log(err);
    } else{
        console.log('Connected to mongodb!');
    }
});

app.use(bodyParser.urlencoded({
    extended: true
}));

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }

    var filterSchema = mongoose.Schema({
        Name: String,
        password: String,
        created: {type: Date, default: Date.now}
    });

    var Filter = mongoose.model('Store', filterSchema);

    http.createServer(function(request, response) {
        console.log(request.body,"......");
        if (request.method == "POST") {
            new Filter({
                Name: request.body.Name,
                password: request.body.password
            }).save(function(err, doc){
                if(err)
                {
                    throw err;
                }
                else {
                    response.send('Successfully inserted!!!');
                }
            });
        }
        else {
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        }
    }).listen(8083);
});
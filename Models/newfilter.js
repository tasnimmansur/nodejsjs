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

fs.readFile('../Views/index.ejs', function (err, html) {
    if (err) {
        throw err;
    }

    var filterSchema = mongoose.Schema({
        name: String,
        password: String,
        created: {type: Date, default: Date.now}
    });

    var Filter = mongoose.model('Store', filterSchema);

    http.createServer(function (request, response) {

        app.post('/', function (req, res) {

            res.status(200).send(req.body);

            Filter = {
                Name: req.body.Name,
                password: req.body.password
            };
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;

                db.collection("Store").insertOne(response, function (err, res) {
                    if (err) throw err;
                    console.log("1 record inserted");

                    db.close();
                });
            });
        }).listen(8089);
    })
});
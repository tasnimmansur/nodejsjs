var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/newdb";
var fs = require("fs");
app.use(bodyParser.json());
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

    var resp = mongoose.model('Store', filterSchema);


app.post('/', function (req, res) {
    res.status(200).send(req.body);
    resp = {
        Name:req.body.Name,
        password:req.body.password
        };
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("customers").insertOne(resp, function(err, res) {
            if (err) throw err;
            console.log("1 record inserted");

            db.close();
        });
    });
});

var port = process.env.PORT || 8083;
app.listen(port);
console.log('Listening on http://localhost:' + port)

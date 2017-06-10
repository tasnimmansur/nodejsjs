var express     =   require("express");
var app         =   express();
var mongoose    =   require("mongoose");
var http = require ('http');

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/dbs';

//mongoose.connect('mongodb://localhost:27017/dbs');

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create User schema
var userSchema  = {
    "Name" : String,
    "password" : String
};
// create model(table)
module.exports = mongoose.model('Store',userSchema);

app.listen(808);
console.log("Listening to PORT 8085");



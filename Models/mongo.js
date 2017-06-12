var express     =   require("express");
var app         =   express();
var mongoose    =   require("mongoose");
var http = require ('http');

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/dbs';

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

// create instance of Schema
var mongoSchema =   mongoose.Schema;

var userSchema  = {
    "Name" : String,
    "password" : String
};

module.exports = mongoose.model('Store',userSchema);

app.listen(8200);
console.log("Listening to PORT 8200");



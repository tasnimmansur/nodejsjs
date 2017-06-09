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

//Lets read our html file only once, at the very beginning when we first start our nodejs process
fs.readFile('./index.html', function (err, html) {

    //Now in here there are two variables which are accessible, `err` and `html`

    if (err) {
        throw err;
    }

    //Create our schema before starting server
    var filter_CheckBoxSchema = mongoose.Schema({
        name: String,
        password: String,
        created: {type: Date, default: Date.now}
    });

    //And now the model as well
    var Filter = mongoose.model('Store', filter_CheckBoxSchema);

    //Now lets start our server
    http.createServer(function(request, response) {
        app.post('/',urlencodedParser, function (req, res) {

        });
        if (request.method == "POST") {
            new Filter({
                name: request.body.Name,
                password: request.body.password,

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
            //This must have been a GET request, lets just send `html` instead
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        }
    }).listen(8083);
});
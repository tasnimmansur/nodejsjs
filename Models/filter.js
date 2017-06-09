var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbs', function(err){
    if(err){
        console.log(err);
    } else{
        console.log('Connected to mongodb!');
    }
});

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
        //The code here is called whenever a new http request is sent to the server
        //There are two variables accessible here, one is `request` which contains
        //data about the original request, while `response` is an object with methods
        //allowing you to respond

        //Here we check what kind of method the browser is using, if its POSTing
        //data then we create a filter from the body
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
var User=require('./mongo');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile('./index.html', {root: path.join(__dirname, 'public')});
});


/*app.use(express.static(__dirname + '/public'));
app.use(app.router);

app.get('/', function (req, res) {
    //res.sendFile(__dirname +'./index.html');
    res.render('index.html');
});*/

app.post('/', function (req, res) {
    var data =new User( {
        Name: req.body.Name,
        Password: req.body.Password
    });
    data.save(function(err,use){
        if(err){
            console.log('error occured');
        }
        console.log('recored inserted');
        console.log('detail'+use);
    });
    res.end(JSON.stringify(req.body));

});

app.get('/', function (req, res) {
    User.find({},function(err,data) {
        if(err){
            console.log('error occured');
        }
        console.log(data);
        res.end( JSON.stringify(data));
    });
});
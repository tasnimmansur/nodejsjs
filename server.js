var express     =   require('express');
var app         =   express();
var bodyParser  =   require('body-parser');
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

app.use('/',router);

app.set('view engine', 'ejs');

app.listen(8081);
console.log("Listening to PORT 8081");

app.post('/', function(req,res){
    var content = new Int(req.body.content);
    content.save(function(err){
        if(err){
            return handleError(err);
        } else {
            console.log('your form has been saved');
        }
    })
});


require('./models/schema.js');
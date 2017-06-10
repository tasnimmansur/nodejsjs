var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoOp     =   require("/mongo");
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
});

http.createServer(function(request, response)
{
    router.route("/users")
        .post(function (req,res) {
            var db = new mongoOp();
            var response={};
            db.Name = req.body.Name;
            db.password =  require('crypto')
                .createHash('sha1')
                .update(req.body.password)
                .digest('base64');
        });

    db.save(function(err)
    {
        if(err) {
            response = {"error" : true,"message" : "Error adding data"};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });

});

app.use('/',router);
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

var path = require('path');

var words = [];

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '/')))

app.post('/uploadStatus', function (req, res) {

    console.log(req.body);
   fs.writeFile( __dirname + "/status.json", JSON.stringify(req.body.words), function (err) {
		if(err) {
		   res.end(err);
		}
		res.end("The result was saved!");
   });

})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
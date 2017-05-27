var express = require('express');
var app = express();

app.get('/', function (req, res) {
  console.log(req.headers['referer']);
  res.send('<h3>Hello World!</h2><a href="./referer">Hello referer!</a>');
});

app.get('/referer', function (req, res) {
  console.log(req.headers['referer']);
  res.send('<h3>Hello referer!</h3><a href="/">Hello World!</a>');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

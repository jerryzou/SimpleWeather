var express = require('express');
var http = require('http');
var path = require('path');
var url = require('url');
var request = require('request');

var app = express();

app.set('port', 3000);
app.set('apikey', 'Replace this string with your key.');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather',function(req, res){
	var weatherEndPoint = 'http://api.wunderground.com/api/' + app.get('apikey')
												+ '/conditions/q/' + url.parse(req.url).query + '.json';
	request(weatherEndPoint, function(err,response,body){
		if(!err && response.statusCode == 200){
			res.end(body);
		}else{
			res.end();
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
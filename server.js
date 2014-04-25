var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


var express = require('express');
var server = express();
var request = require('request-json');
var client = request.newClient('https://aerogear-camon.rhcloud.com/');

server.get('/send', function(req, res){
  console.log(req.query);

  var data = {
    "alias": [req.query.alias],
    "message": {
      "alert":"Test avec Curl", 
      "badge":666,
      "customKey":"some value"}
    };

  client.setBasicAuth(req.query.pAID, req.query.ms);
  client.post('rest/sender', data, function(err, res, body) {
      return console.log(res.statusCode);
  });

  res.send('hello world');
});


server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
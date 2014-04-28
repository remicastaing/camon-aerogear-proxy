var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


var express = require('express');
var server = express();
var request = require('request-json');
var client = request.newClient('https://aerogear-camon.rhcloud.com/');

// server.param('PushApplicationID', /^\d+$/);
// server.param('MasterSecret', /^\d+$/);
// server.param('alias', /^\d+$/);
// server.param('alert', /^\d+$/);

server.get('/send/:PushApplicationID/:MasterSecret/:alias/:alert', function(req, res){
  console.log(req.params);

  var data = {
    "alias": [req.params.alias],
    "message": {
      "alert":req.params.alert}
    };

  client.setBasicAuth(req.params.PushApplicationID, req.params.MasterSecret);
  client.post('rest/sender', data, function(err, res, body) {
      return console.log(res.statusCode+': send to: '+req.params.alias);
  });

  res.send('hello world');
});


server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
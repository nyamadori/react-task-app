var ws = require('ws');
var http = require('http');
var express = require('express');
var peer = require('peer');

var app = express();
var server = http.createServer(app);
var wss = new ws.Server({server: server});
var peerServer = peer.PeerServer({port: 9000});

var peers = {};

app.use(express.static('./public'));

wss.on('connection', function (ws) {
  ws.on('message', function (data) {
    var msg = JSON.parse(data);
    console.log('received: ', msg.cmd, msg.obj);

    wss.clients.forEach(function (client) {
      client.send(data);
    });
  });
});

server.listen(3000);

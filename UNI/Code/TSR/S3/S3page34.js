/*
  Taking as a base the example of page 34
  1. Extend the client in order to send a message per second,
  numbering each sent message
*/

var zmq = require('zmq');
var rq = require('req');

rq.connect("tcp://127.0.0.1:8888");
rq.connect("tcp://localhost:8889");
rq.on('message', function(m){
  console.log('Response. ' + m);
});

var counter = 0;
setInterval(function(){
  rq.send('Hello' + (++counter));
}, 1000);

/* 2. Replace the REQ socket, and use a DEALER instead
   in order to interact without problems with a REP socket at the server
   side
*/

// To Complete

var zmq = require('zmq');
var rq = require('req');

rq.connect("tcp://127.0.0.1:8888");
rq.connect("tcp://localhost:8889");
rq.on('message', function(m){
  console.log('Response. ' + m);
});

var counter = 0;
setInterval(function(){
  rq.send('Hello' + (++counter));
}, 1000);

/*
  Some command line arguments may
  be needed:
  1. Port numbers for PUB socket
  2. Port number for Pull socket
*/

const zmq = require('zmq');
const pub = zmq.socket('pub');
const pull = zmq.socket('pull');

var args = process.argv.slice(2);  //para eliminar los argumentos del principio los 2 defaults
var pubPort = args[0] || 8070;
var pullPort = args[1] || 8071;

pub.bindSync("tcp://*"+pubPort);
pull.bindSync("tcp://*"+pullPort);

// pull is the one who will receive the message so we have to create a
// listener. With this msg we have to broadcast
pull.on("message", function(msg){
  pub.send(msg);    //used to broadcast
});

process.on('SIGINT', function(){
  var msg = {type: 'END'};
  pub.send(JSON.stringify(msg));
});

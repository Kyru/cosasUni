// Client.js
/*
   Several command line arguments may
   be needed;
   1. User nickname
   2. URL of the server PUB socket
   3. URL of the server PULL socket
 */

const zmq = require('zmq');
const sub = zmq.socket('sub');
sub.subscribe('');      // if this its not place, the program will not be able to send things back to the server
const push = zmq.socket('push');

var args = process.argv.slice(2);  //para eliminar los argumentos del principio los 2 defaults
var nickname = args[0] ||'Client-' + process.pid;
var pubURL = args[1] ||'tcp://localhost:8070';
var pullURL = args[2] ||'tcp://localhost:8071';

sub.connect(pubURL);
push.connect(pullURL);
push.send(JSON.stringify({type:'CONN', id:nickname})); //siempre enviamos un CONN al principio para iniciar la conexion

sub.on('message', function(message){
  var msg = JSON.parse(message);
  switch (msg.type) { // types are: CONN, CHAT, DISC, END
    case 'CONN': console.log('Server > chat-client %s connected', msg.id); break;
    case 'CHAT': console.log('%s > %s', msg.id, msg.text); break;
    case 'DISC': console.log('Server > chat-client %s disconnected', msg.id); break;
    case 'END': console.log('Server is ending, the chat is closed!');
                disconnect();
                break;
  } // switch
});

function disconnect(){
  sub.close();
  push.close();
  process.exit(1);
}

process.stdin.resume();
process.stdin.setEncoding('UTF-8');
process.stdin.on('data', function(line){
  var msg = {type: 'CHAT',
             id: nickname,
             text: line.slice(0, line.length-1)}; //we can use the slice in strings too
  push.send(JSON.stringify(msg));
})

//Manage [Ctrl]+[D]
process.stdin('end', function(){
  var msg = {type: 'DISC',
             id: nickname};
  push.send(JSON.stringify(msg));
});

process.on('SIGINT', function(){  //SIGINT son señales de linux, por ejemplo CTRL+D
  push.send(JSON.stringify({type: 'END'}));
  disconnect();
});

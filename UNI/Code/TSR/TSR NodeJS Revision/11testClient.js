var net = require('net');
// The server is in our same machine
var client = net.connect({port:9000}, function(){
  console.log('Client connected');
  client.write('World!\r\n');
});

client.on('data', function(data){
  // Write the received data to stdout
  console.log(data.toString());
  // This says that no more data will be written to the socket
  client.end();
});

client.on('end', function(){
  console.log('Client Disconnected');
});

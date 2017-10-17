var net = require('net');
var server = net.createServer(function(c){     //Connection listener
  console.log('Server connected');
  c.on('end', function(){
    console.log('Server Disconnected');
  });
  // Send hello to the client
  c.write("Server sends -> Hello\r\n");
  // With pipe() we write to socket 'c' what is read from 'c'
  /*
    the function pipe() is equivalent to:
    socket.on('data', function(chunk) {
      socket.write(chunk);
    });
    Basically pipe() is a function reads data from a readable stream as it
    becomes available and writes it to a destination writable stream.
  */
  c.pipe(c);
}); // End of net.createServer();

server.listen(9000, function(){       //listening listener
  console.log("Server bound");
});

// EXERCISE 1

var net = require('net');
var fun = require('./myfunctions.js');

var end_listener = function(){console.log('Server disconnected');}
var error_listener = function(){console.log('Some connection error');}
var bound_listener = function(){console.log('Server bound');}


var server = net.createServer(function(c){

  console.log("Server Connected");
  c.on('error', error_listener);
  c.on('end', end_listener);
  c.on('data', function(data){
    var obj = JSON.parse(data);
    var res;
    if(typeof(obj.num) != 'number') res = NaN;
    else{
      switch (obj.func) {
        case "fibo": res = fun.fibo(obj.num); break;
        case "fact": res = fun.fact(obj.fact); break;
        default: res = NaN;
      }
    }

  c.write(obj.func + "(" + obj.num + ") = " + res);


  });

});

server.listen(9000, bound_listener);

// EXERCISE 2

var net = require('net');

var type = process.argv[2];
var value = Math.abs(parseInt(process.argv[3]));

//checks first argument is correct
if(type != ("fibo" || "fact")) {
  console.log("First argument must be fibo or fact");
  process.exit(1);
}
//checks second argument is correct
if(typeof(value) != 'number'){
  console.log("Second argument must be a valid number");
  process.exit(1);
}

//checks number of arguments
if ( process.argv.length != 4 ) {
 console.log('too many arguments -> uso: node client_net function_id number_value');
 process.exit(0);
}

//the server is in our same machine
var client = net.connect({port:9000}, function(){ //connect listener
  console.log("Client connected");
  var res = JSON.stringify({func: type, numb: value});
  client.write(res);
});

client.on('end', function(){
  console.log("Client disconnected");
});

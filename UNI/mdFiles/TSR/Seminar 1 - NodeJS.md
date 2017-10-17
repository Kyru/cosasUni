Solution to modification of the example page 47 modifications:
+ The server manages multiple clients
+ For each client message A, it returns "Hello" + A
+ The client is not finishied once it send its first message
  + It sends periodically the same message every 5 secods

```javascript
// Client
var net = require('net');
var client = net.connect({port:9000};
  function(){
    console.log("client connected");
  });
client.on('data', function(msg){
  console.log(msg.toString());
});

var text = process.argv[2] || 'default identity';

client.on('end', function(){
  console.log('client disconnect');
});

setInterval(function(){
  client.write(text);
}), 5000);

// Server
var net = require('net');
var server = net.createServer(function(c){
  console.log('server connected');
  c.on('end', function(){
    console.log('server disconnected');
  });
  c.on('data', function(msg){
    c.write('Hello' + msg);
  });
}).listen(9000, function(){
  console.log('server bound');
});
```
### Exercises S1
#### Activity 1
a) Only the table of 5 will be printed with the function table(5,4,1) because the functions table only expects one argument
b) First the table(2) function is executed - This function those not return a number, instead it returns an undefined, so when the second call is done table(undefined) we are creating the table of NaN which always returns NaN. So the output is the printing of the NaN table:
NaN x 1 = NaN
NaN x 2 = NaN
...
c) allTables (undefined, undefined, undefined)
d) ...

#### Activity 2

BUSCAR SOLUCION EN POLIFORMAT 

#### Activity 3

a) the return result fo line 25 is: "0" + function(y){return x\*y;} + funtion(y){return x*y;}
where in the first function x = 3 and the second function is x = 5 due to the next position in the array (myArray)
b) iterate(2, a3(2), myArray); => Where a3(2) is function(y){return 2*y);
So therefore, teh answer is 0+ (3*2) + 10 = 16
c) iterate(2, add, myArray); => 0 + 0 + 0
























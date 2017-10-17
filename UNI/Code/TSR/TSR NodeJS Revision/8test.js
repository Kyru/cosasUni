function fibo(n){
  return (n<2) ? 1: fibo(n-2) + fibo(n-1)
}

console.log("Starting..");

// Writes a message in 10 ms
setTimeout(function(){
  console.log("M1: Something is written...");
}, 10);

//This statement lasts more than 5 secs
var j = fibo(40);
function anotherMessage(m,u){
  console.log( m + ": The result is: " + u);
}

//M2 is written before M1 since the "main" thread is never interrupted
anotherMessage("M2", j);

//M3 is written after M1
setTimeout(function(){
  anotherMessage("M3", j);
}, 1);

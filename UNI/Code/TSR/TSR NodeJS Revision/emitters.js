// EMITTERS // 

var ev = require('events');
var emitter = new ev.EventEmitter;

//Name of the events
var e1 = 'print';
var e2 = 'read';
var e3 = "E3";

//Aux variables
var num1 = 0;
var num2 = 0;

//Listener functions are registered in the event emitter
emitter.on(e1, function(){
  console.log('Event ' + e1 + 'has' + "happened " + ++num1 + "times.")
});

emitter.on(e2, function(){
  console.log('Event ' + e2 + 'has' + "happened " + ++num2 + "times.")
});

/*
Esto lo que hace es que cuando se detecte un e3 (es decir, cuando se emita
un e3), tendremos una funccion listener que hará lo que le digamos. En
este caso, imprimirá.
*/
emitter.on(e3, function(){
  console.log(e3 + ' WHEEEEPA!!');
})

/*
la funcion .once, crea un listener de un solo uso. No lo mantiene como
en la funcion .on
*/
emitter.once(e3, function(){
  console.log(e3 + ' WHEEEEPA!!');
})


//There might be more than one listener for the same Event
emitter.on(e1, function(){
  console.log("Something has been printed!");
});

//Generate the events periodically...
//First event generated every 2 seconds
setInterval(function(){
  emitter.emit(e1);
}, 2000);

//Second event generated every 3 seconds
setInterval(function(){
  emitter.emit(e2);
}, 3000);

/*
Esto lo que hace es que en 10secs, se haga el setInterval infinitamente.
setTimeout espera el tiempo que le pases como argumento para hacer la
funcion
*/
setTimeout(function(){
  setInterval(function(){
    emitter.emit(e3);
  }, 1000);
}, 10000);

//sin el setInteval solo se emitirá una vez
emitter.emit(e3);

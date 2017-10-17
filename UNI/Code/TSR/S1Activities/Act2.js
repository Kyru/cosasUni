var ev = require('events');
var emitter = new ev.EventEmitter;
var e1 = "event 1";
var e2 = "event 2";
var e3 = "event 3";
//var num1 = 0;
//var num2 = 0;
//var num3 = 0;
var interval2 = 2000;

function Listener(n1,n2, n3) {
	this.num1 = 0;
	this.name1 = n1;
	this.num2 = 0;
	this.name2 = n2;
	this.num3 = 0;
	this.nam3 = e3;
}

var lis = new Listener(e1,e2,e3);

emitter.on(e1, function() {lis.event1()});
emitter.on(e2, function() {lis.event2()});
emitter.on(e3, function() {lis.event3()})

Listener.prototype.event1 = function() {
	this.num1++;
	console.log("Event one " + this.num1);
};

Listener.prototype.event2 = function() {
	this.num2++;
	if(this.num2 > this.num1){
		console.log("Event two " + this.num2);
	} else {
		console.log("I have received more events of type one");
	}
	console.log(interval2);
};

Listener.prototype.event3 = function(){
	console.log("Event three");
	if(interval2 < 9000){
		interval2 = interval2*2;
		if(interval2 > 9000) interval2 = 9000;
		clearInterval(time);
		time = setInterval( function() {
					emitter.emit(e2);
					}, interval2);
		console.log(interval2);
	}
};

setInterval( function() {
	emitter.emit(e1);
}, 3000 );

var time = setInterval( function() {
					 emitter.emit(e2);
					 }, interval2 );


setInterval( function() {
	emitter.emit(e3);
}, 10000 );

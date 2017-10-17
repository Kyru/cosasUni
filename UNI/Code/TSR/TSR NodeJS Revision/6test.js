var dog = {
  name:'Toby',
  legs: 4,
  state: function(){console.log(this.name + " is okay!")},    //be careful with commas
  othervariable: 3
}

dog.state();
var f = dog.state;
f(); // undefined, it is not bound to an object
f2 = f.bind(dog); f2(); // a way of doing the bounding
for(var k in dog) console.log(k); // to access properties name (name)
delete dog.name;    // deletes property name
for(var k in dog) console.log(dog[k]); // to access real properties ("Toby")
                                       // here in the case of state it appears as
                                       // [Function: state]

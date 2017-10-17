var ob = {"x":23, "y":{"a":45, "b":[5,0]}}
var s = JSON.stringify(ob);
console.log(s);   // {"x":23,"y":{"a":45,"b":[5,0]}}

var p = JSON.parse(s);

console.log(p); // { x: 23, y: { a: 45, b: [ 5, 0 ] } }
  

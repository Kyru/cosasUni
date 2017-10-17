function mult(a) {var r = 1; for (i in a) r *= a[i]; return r}

var a = [1,2,3];

console.log(mult(a));

var one = a.reduce(function(a,b){
  return a + b;
});

var two = a.reduce(function(a,b){
  return a*b;
})

console.log(one, "  ", two);

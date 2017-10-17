function a3(x) {
	return function(y) { return x*y; };
}

function add(v) {
	var sum=0;
	for (var i=0; i<v.length; i++)
		sum += v[i];
	return sum;
}

function iterate(num, f, vec) {
	var amount = num;
	var result = 0;
	if (vec.length<amount)
		amount=vec.length;
	for (var i=0; i<amount; i++)
		result += f(vec[i]);
	return result;
}

var myArray = [3, 5, 7, 11];

// Devuelve la funcion(y) 2 veces porque al no pasarle argumentos,  el
// return realmente es esa funcion y son 2 veces porque hay 2 iteraciones
console.log('25 ' + iterate(2, a3, myArray));
// Devuelve 16, funciona correctamente
console.log('26 ' + iterate(2, a3(2), myArray));
// Devuelve 0 porque no funciona y no devuelve una funcion porque el
// return es de una variable, no de una funcion
console.log('27 ' + iterate(2, add, myArray));
// Devuelve la suma de todos los elementos del array = 26
console.log('28 ' + add(myArray));
// Devuelve la suma de todos los elementos del array multiplicados por 3
// = 78
console.log('29 ' + iterate(5, a3(3), myArray));
// Devuelve la suma de todos los elementos del array multiplicados por 1
// lo mismo que la suma de todos los elements = 26
console.log('30 ' + iterate(5, a3(1), myArray));

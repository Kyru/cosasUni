function multiplyBy(x){
	return function(y){
		var l = x+y;
		return function(z){return z+l;}
		}
	}
	var triplicate = multiplyBy(3);
	y = triplicate(21);
	z = y(10);
	console.log(z);

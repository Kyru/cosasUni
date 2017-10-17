function createFunc(){
	var name = process.argv[2];
	return function(){console.log(name)}
      	}
	var myFunc = createFunc();
	myFunc();

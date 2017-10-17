function greetings(){
	for(var i = 0; i < arguments.length; i++){
		console.log("Hello, " + arguments[i])
	}
}

greetings(process.argv[2], process.argv[3], process.argv[4]);

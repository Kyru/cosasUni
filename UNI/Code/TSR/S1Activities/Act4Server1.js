var http = require('http');
var url = require('url');
var qs = require('querystring');

http.createServer( function(request,response) {
	var query = url.parse(request.url).query;
	console.log(query);
	var info = qs.parse(query).info;
	console.log(info);
	var x = 'equis';
	var y = 'y griega';
	response.writeHead(200, {'Content-Type':'text/plain'});
	switch( info ) {
		case 'x': response.end('Value = ' + x); break;
		case 'y': response.end('Value = ' + y); break;
	}
}).listen(1337, "127.0.0.1");

/*
lo que queremos pasarle es al final del link un ?info=x que crea la query
info=x, que luego en la var info obtenemos el resultado x. Entonces, al
hacer el switch podemos obtener info=x o info=y y nos impimirá dependiendo
del resultado
*/

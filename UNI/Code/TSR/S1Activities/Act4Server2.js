var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');

var pathdir = require('path').basename(__dirname);
var pathname = __dirname;

// Creates the list of all files in the directory
var list = [];
function listCreation(){
              fs.readdir(pathname, function(err, files) {
                files.forEach(function(file){
                  list.push(file.toString());
                });
            });
          }
listCreation();


http.createServer(function (request, response) {
  var query = url.parse(request.url).query;
  var info = qs.parse(query).query;

  // To obtain the current date and time
  var currentdate = new Date();
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                   + (currentdate.getMonth()+1)  + "/"  //adds one because it starts in 0
                   + currentdate.getFullYear() + " @ "
                   + currentdate.getHours() + ":"
                   + currentdate.getMinutes() + ":"
                   + currentdate.getSeconds();

  // String of elements in the list
  var dirBeginning = "The current files in the server directory are: ";
  var lString = list.toString();
  var dirReturn = dirBeginning.concat(lString);

 response.writeHead(200, {'Content-Type': 'text/plain'});

 switch (query) {
   case "time": response.end(datetime); break; //http://localhost:1337/?time
   case "dir": response.end(dirReturn); break; //http://localhost:1337/?dir
   default: {
     if(fs.existsSync("./"+query)){
       fs.readFile("./"+query, function(err, data){
         if(err){} else{
           response.writeHead(200, {'Content-Type': 'text/plain'});
           response.end(data);                 //http://localhost:1337/?Act4Server2.js
         }                                     //would print the contents of this file
      });
    } else {
         response.writeHead(404, {'Content-Type': 'text/plain'});
         response.end(query + " -> File not found");   //http://localhost:1337/?blabla
    }                                               // It does not exist, "file not found"
/*
  THE SWITCH:
  case time - obtains date and time
  case dir - obtain files in the current directory
  dedault - checks whether the query equals a file directory that exists, if it does, it
  prints its content (with readFile), if none is equal it prints an error
*/
    }
  }

}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');

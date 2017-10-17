// Faltaria implementarlo mediante Closures! !

var fs = require('fs');

var listSize = [];
var listArgs = [];

process.argv.forEach((val, index) => {
  if(fs.existsSync(val)){
    if(index > 1){
      var stats = fs.statSync(val);
      var size = stats.size;
      listSize.push(size);
      listArgs.push(val);
    }
  } else {
    console.log("error");
  }
});

var arraytest = ["baby", "lucas", "manuel"];
var uno = "baby";
var dos = "nuevo";
if(!arraytest[uno]) console.log("mal");
if(arraytest[uno]) console.log("encontrado");
if(!arraytest[dos]) arraytest[]

var max = 0;
var arg = 0;

for(var i = 0; i < listSize.length; i++){
  var current = listSize[i];
  if(current > max){
      max = current;
      arg = i;
  }
}

console.log(listArgs[arg] + " size: " + max + " has the largest size");

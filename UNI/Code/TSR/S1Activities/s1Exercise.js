// EJ 1

var net = require('net');
var fs = require('fs');
var votos = [];

var server = net.createServer(function(c){
  c.on('data', function(data){  // todo ocurre cada vez que recibe datos
    var obj = JSONparse(data);  // convierte los datos
    var pro = obj.provincia();  // pilla la provincia que hará falta mas adelante
    delete obj.provincia;       // elimina la provincia y colegio porque solo te
    delete obj.colegio;         // interesan los votos de los partidos
    if(!votos[pro]){
      votos[pro] = obj;         // si no existe la provincia en el array
    } else {                    // la añade al array con los datos obtenidos
      for(k in obj){
        if(!votos[pro][k]) votos[pro][k] = obj[k];
        else votos[pro][k] += obj[k];
      }
    }       // el for lo que hace es que busca por todo el array si han
  })        // sido añadidos ciertos datos, si no, los añade y si si que
})          // se han añadido le suma los nuevos valores

server.listen(9000,       //comprueba que se ha conectado al puerto correcto
    function(){ console.log('server bound');
  })

function guardar(){
  for(k in votos){
    var v = JSON.stringigy(votos[k]);
    fs.writeFileSync(k + '.txt', v);
  }
  console.log('datos volcados a disco');
}

/*
  saca los datos de cada provincia los convierte a un string y los
  escribe en un documento .txt llamado como la provincia de cada uno
*/

// Cada 20 secs, se guarda automaticamente
setInterva(guardar, 20000);

// EJ 2

var fs = require('fs');
var total_votos = [];
var votos = [];

fs.readdir('.', function(err, files){
  var count = files.length;           //counts the number of files in the . directory
  for(var i = 0; i < files.length; i++){ //loop to read files
    fs.readFile(files[i], function(x){   //creates a closure function
      return function(err, data){
        count--;                    //removes one, to identify this has already been visited
        if(err) return;
        if(files[x].slice(-4)!= '.txt') return; //if it is not a .txt it does not read it and does return
        var j = files[x].slice(0,-4);       //obtains the name of the file which is the province
        votos[j] = JSON.parse(data);  // transforms the object data into a string
        for(k in votos[j]){
          if(!total_votos[k]) total_votos[k] = votos[j][k];
          else total_votos[k] += votos[j][k];
        }
        /*
          En este for lo que haces es buscar por el array si existen o no
          en el array total_votos los votos de cada partido por provincia
          la k es un atributo del objecto province, por lo tanto será un
          partido con sus votos. Si existe se sumarán a la variable correspondiente
          ya existente y si no se creará y se añadirá.
        */
        if(count <= 0) consultar(votos); //si aqui se ha llegado a 0 ya puedes
      }                     // ir a consultar() que es el metodo que te lo imprime en pantalla
    }(i));    //se hace un casting de la funcion closure, por lo tanto
  }           //se sustituye la x por i al acabar la funcion, entonces
})            //funciona correctamente

function consultar(votos){
  console.log('\nResultados globales:');
  console.log('Votos:', total_votos);  //la , funciona como un +
  console.log('\n\nProvincia:');
  process.stdin.on('data', function(str){
    var provincia = str.slice(0, str.length-1);
    var res = JSON.stringify(votos[provincia]) 
    console.log('Votos en ' + provincia + ': ' + res);
    console.log('\nProvincia:')
  });
}

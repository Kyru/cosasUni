function alert(x) {
  console.log(x);
}

var global = 'this is global';

function scopeFunction(){
  alsoGlobal = 'this is also global';
  var not global = 'This is private to scopeFunction';

	function subfunction(){
	  alert(notGlobal);
	  stillGlobal = 'no var keyword so this is global';
	  var isPrivate = 'This is private to subfunction!';
	}

  alert(stillGlobal); //error havent executed subfunction

  subFunction();
  alert(stillGlobal);
  alert(isPrivate);
  alert(global);

  }

  alert(global);
  alert(alsoGlobal);
  
  scopeFunction();

  alert(alsoGlobal);
  alert(notGlobal);

















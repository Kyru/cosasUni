fs.readFile('jsonFILE', function(error, text){
  if(error) console.error('error');
  else {
    try{
      const obj = JSON.parse(text);
      console.log(JSON.stringify(obj))
    } catch(e){
      console.error('error');
    }
  }
})

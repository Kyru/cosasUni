readFilePromisified('jsonFILE').then(function(text){
  const obj = JSON.parse(text);
  console.log(JSON.stringify(obj))
}).catch(function(error){
  console.error('error');
})

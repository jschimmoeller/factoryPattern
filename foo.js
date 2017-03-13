var p = new Promise(function(resolve, reject){
	setTimeout(function(){
		resolve('d');
	});
});

p.then(function(d){
console.log('d');
});

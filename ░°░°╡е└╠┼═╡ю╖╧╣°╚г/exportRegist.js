var a = require('./a.js');
var fs = require('fs');
var n = 1;

fs.appendFile('progrmRegistNo.txt'," "+JSON.parse(body).response.body.items.item[i].progrmRegistNo,'utf-8');

fs.readFile('progrmRegistNo.txt','utf8',function(error, data){
	if(error)	throw error;
	console.log(a(n));
	//n의 범위는 1~318
})
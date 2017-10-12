var fs = require('fs');
var process = require('process');
var detail_one_input = require('./detail_one_input');
var data_slice;
fs.readFile('regnum.txt', 'utf8', function(error, data){
	data_slice = data.split(" ");
	//console.log(data_slice.length);
	for(var i=0;i<30;i++){
		
			detail_one_input(data_slice[i+3150]);
		
	}
	
})


var express = require('express');
var router = express.Router();

var request = require('request');
var http = require('http');

var url = 'http://202.30.66.55/openapi/service/rest/VolunteerPartcptnService/getVltrPartcptnItem';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'ahy2jeesQPj%2FU58va0GKMSMp9sK6LpX9sPhgW%2BJJyXD33sQr2s0xcPe7Az3HT1MH4XOo63DywC6RBVR8O1LUgQ%3D%3D'; /* Service Key*/
queryParams += "&_type=json"
queryParams += "&pageNo="
//pageNo의 범위는 1~318
var request = require('request');
 
// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json'
}
// Configure the request
var options = {
    url: url + queryParams,
    method: 'GET',
    headers: headers
}

module.exports = function(num){
        queryParams+=(String)num;
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
               // for(var i=0;i<10;i++){
                	console.log(JSON.parse(body).response.body.items.item[i].nanmmbyNm);
                return JSON.parse(body).response.body.items.item[i].nanmmbyNm;
                
               // }
            }
        })
}

module.exports = router;

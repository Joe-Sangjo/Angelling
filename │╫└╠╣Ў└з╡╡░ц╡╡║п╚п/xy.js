var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var request = require('request');
var http = require('http');

var connection = mysql.createConnection({
    host : 'angelling-rds-mysql.cfykzdpbmupm.us-west-2.rds.amazonaws.com',
    port : '3306',
    user : 'angel',
    password : 'angelling',
    database : 'Angelling',
});
var url = 'http://openapi.map.naver.com/api/geocode?key=aa92b74562481c9ca4e0529b0889d043&encoding=utf-8&coord=latlng&output=json&query='
var addresss;
var queryParams;
// Set the headers
var headers = {
    'Content-Type':     'application/json'
}
 //e8800d6ee927c62ce429102a08eaf5ba
 //aa92b74562481c9ca4e0529b0889d043
// Configure the request
var options;
var i=0;
/*
connection.query('SELECT progrmRegistNo, postAdres FROM Voluntary',function(error,data){
    if(error){
        console.log("쿼리 오류");
    }
    else{
        for(var i = 0 ; i<data.length;i++){
            addresss = data[i].postAdres;
            queryParams=encodeURIComponent(addresss);
            options = {
                url: url+queryParams,
                method: 'GET',
                headers: headers
            }
            request(options, function (error, response, body) {
                    try{
                        console.log(JSON.parse(body).result.items[0].point.x)
                        console.log(JSON.parse(body).result.items[0].point.y);
                    }
                    catch(exception){
                        throw exception;
                        //continue;
                    }
            })
        }
    }
})
*/

function mmm(data)
{   
   //console.log(i+"    "+data[i].progrmRegistNo+"  "+data[i].postAdres+"   "+i);
   //addresss = data[i].postAdres;
   console.log("보내기전 데이터"+data[i].postAdres);
   queryParams=encodeURIComponent(data[i].postAdres);
   /* options = {
      url: url+queryParams,
      method: 'GET',
      headers: headers
   }*/
   request({
      url : url + encodeURIComponent(data[i].postAdres),
      method : 'GET',
      headers : headers
   }, function (error, response, body) {

      if (!error && response.statusCode == 200) {
         try{
            //console.log(JSON.parse(body).result.items[0].point.x+"  "+JSON.parse(body).result.items[0].point.y)
            xx[i]=JSON.parse(body).result.items[0].point.x;
            yy[i]=JSON.parse(body).result.items[0].point.y;
            //console.log('찾은데이터   '+data[i].postAdres+"    "+JSON.parse(body).result.items[0].point.y);
            connection.query('update Voluntary set x = ? where postAdres = ?;',
               [JSON.parse(body).result.items[0].point.x, data[i].postAdres]
            ,function(error){
               if(error){
                  console.log("입력되지 않았습니다.");
                  i++;
                  mmm(data);
               }
               else{
                  console.log(i+"  입력되었어요 "+data[i].progrmRegistNo+"   "+data[i].postAdres+"  "+JSON.parse(body).result.items[0].point.x);
                  i++;
                  mmm(data);
               }
            })
         }
         catch(exception){
            console.log('위도 경도 가져오기 실패');
            i++;
            mmm(data);
         }
      }
   })
   
}


var xx=new Array(4000);
var yy=new Array(4000);
connection.query('SELECT progrmRegistNo, postAdres FROM Voluntary', function(error,data){
    if(error){
        console.log('쿼리오류');
    }
    else{
        console.log('쿼리 데이터 가져오기 성공');       
        //console.log(data[i].progrmRegistNo+"  "+data[i].postAdres+"   "+i);
        
      mmm(data);
        

        
    }
})


/*
request(options, function (error, response, body) {
    

    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(JSON.parse(body).result.items[0].point.x)
        console.log(JSON.parse(body).result.items[0].point.y);

    }
})
*/

module.exports = router;
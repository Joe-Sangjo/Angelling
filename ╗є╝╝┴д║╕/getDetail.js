var express = require('express');
var request = require('request');
var router = express.Router();
//var http = require('http');
var process = require('process');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'angelling-rds-mysql.cfykzdpbmupm.us-west-2.rds.amazonaws.com',
    port : '3306',
    user : 'angel',
    password : 'angelling',
    database : 'Angelling',
});

connection.connect(function(err) {
    if(err) {
            console.log('mysql connection error');
            console.log(err);
            throw(err);
    }
});

module.exports = function(num){


    var url = 'http://202.30.66.55/openapi/service/rest/VolunteerPartcptnService/getVltrPartcptnItem';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'ahy2jeesQPj%2FU58va0GKMSMp9sK6LpX9sPhgW%2BJJyXD33sQr2s0xcPe7Az3HT1MH4XOo63DywC6RBVR8O1LUgQ%3D%3D'; /* Service Key*/
    queryParams += "&_type=json&progrmRegistNo="


    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/json'
    }
    var n=String(num);
    queryParams+=n;
    var data;
    var options = {
        url: url + queryParams,
        method: 'GET',
        headers: headers
    }
    request(options, function (error, response, body){
        try{
        if (!error && response.statusCode == 200) {
            if(JSON.parse(body).response.body.items.item.actPlace=null){
                console.log("데이터를 전송 받지 못했습니다.");
                process.exit();
            }
            else{
                console.log("받아온 데이터 "+JSON.parse(body).response.body.items.item.progrmRegistNo);
                data = JSON.parse(body).response.body.items.item;
                connection.query('replace into Angelling.Voluntary set ?',{
                    progrmRegistNo : data.progrmRegistNo,
                    progrmSj : data.progrmSj,
                    progrmSttusSe : data.progrmSttusSe,
                    progrmBgnde :data.progrmBgnde,
                    progrmEndde : data.progrmEndde,
                    actBeginTm :data.actBeginTm,
                    actEndTm :data.actEndTm,
                    noticeBgnde : data.noticeBgnde,
                    noticeEndde :data.noticeEndde,
                    rcritNmpr :data.rcritNmpr,
                    actWkdy :data.actWkdy,
                    appTotal :data.appTotal,
                    srvcClCode :data.srvcClCode,
                    adultPosblAt :data.adultPosblAt,
                    yngbgsPosblAt :data.yngbgsPosblAt,
                    familyPosblAt :data.familyPosblAt,
                    pbsvntPosblAt :data.pbsvntPosblAt,
                    grpPosblAt :data.grpPosblAt,
                    mnnstNm :data.mnnstNm,
                    nanmmbyNm :data.nanmmbyNm,
                    actPlace :data.actPlace,
                    nanmmbyNmAdmn : data.nanmmbyNmAdmn,
                    fxnum : data.fxnum,
                    postAdres :data.postAdres,
                    email : data.email,
                    progrmCn: data.progrmCn,
                    astelno : data.telno
                },function(error){
                    if(error){
                        console.log("쿼리 문장에 오류가 있습니다");
                        process.exit();
                    }else{
                        console.log("입력되었습니다. "+data.progrmRegistNo);
                        //process.exit();
                    }
                })
            }
        }
    }catch(exception){
        
    }
    });
}
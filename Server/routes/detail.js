var express = require('express');
var router = express.Router();
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


/* GET users listing. */
router.get('/:registno', function(req, res, next) {
        connection.query('select * from Angelling.Voluntary where progrmRegistNo = ?',[req.params.registno], function(error,cursor) {
                if(error!=undefined){
                        res.sendStatus(503);
                }
                else{
                        res.json(cursor[0]);
                }
        });
});


module.exports = router;

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
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:addressparams', function(req, res, next) {

        var distance = req.params.addressparams;
        connection.query('select progrmRegistNo, progrmSj, astelno, postAdres, x, y from Angelling.Voluntary where postAdres like ?', '%'+distance+'%', function(error, cursor) {
                if(error!=undefined){
                        res.sendStatus(503);
                }
                else{

                         res.json(cursor);

                }
        });
});


module.exports = router;
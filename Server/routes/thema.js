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

router.get('/:type',function(req, res, next){
        var selection = req.params.type;

    switch(selection){
        case 'env' :
            connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x, y FROM Angelling.Voluntary where srvcClCode like ?','환경보호%',function(error, data){
                if(error!=undefined){
                    res.sendStatus(503);
                }
                else{

                    connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres,x ,y  FROM Angelling.Voluntary where srvcClCode like ?','농어촌%',function(error2,data2){
                        if(error2!=undefined){
                            res.sendStatus(503);
                        }
                        else{
                            res.json(data.concat(data2));
                        }
            });
        }
    });
                break;
        case 'edu' :
            connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres,x,y FROM Angelling.Voluntary where srvcClCode like ?','교육%',function(error, data){
                if(error!=undefined){
                    res.sendStatus(503);
                }
                else{

                    connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x, y  FROM Angelling.Voluntary where srvcClCode like ?','멘토링%',function(error2,data2){
                        if(error2!=undefined){
                            res.sendStatus(503);
                        }
                        else{
                            res.json(data.concat(data2));
                        }
            });
        }
    });
                break;
        case 'local' :
                 connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres , x,y FROM Angelling.Voluntary where srvcClCode like ?', '행정지원%',function(error,data){
                    if(error!=undefined){
                        res.sendStatus(503);
                    }
                    else{
                        connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x, y FROM Angelling.Voluntary where srvcClCode like ?', '문화체육%',function(error2, data2){
                            if(error2!=undefined){
                                res.srvcClCode(503);
                            }
                            else{
                                var totaldata=data.concat(data2);
                                res.json(totaldata);
                            }
                        });
                    }
                });


                break;
        case 'ali' :
                connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x, y FROM Angelling.Voluntary where srvcClCode like ?', '상담%',function(error,data){
                    if(error!=undefined){
                        res.sendStatus(503);
                    }
                    else{
                        connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x, y FROM Angelling.Voluntary where srvcClCode like ?', '주거환경%',function(error2, data2){
                            if(error2!=undefined){
                                res.srvcClCode(503);
                            }
                            else{
                                connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x ,y FROM Angelling.Voluntary where srvcClCode like ?', '공익%',function(error3,data3){
                                    if(error3!=undefined){
                                        res.srvcClCode(503);
                                    }
                                    else{
                                        res.json(data.concat(data2,data3));
                                    }
                                });
                            }
                        });
                    }
                });


                break;
        case 'living' :
   connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres,x ,y FROM Angelling.Voluntary where srvcClCode like ?', '생활편의%',function(error,data){
                    if(error!=undefined){
                        res.sendStatus(503);
                    }
                    else{
                        connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x, y FROM Angelling.Voluntary where srvcClCode like ?', '안전%',function(error2, data2){
                            if(error2!=undefined){
                                res.srvcClCode(503);
                            }
                            else{
                                connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x, y FROM Angelling.Voluntary where srvcClCode like ?', '재해%',function(error3,data3){
                                    if(error3!=undefined){
                                        res.srvcClCode(503);
                                    }
                                    else{
                                        res.json(data.concat(data2,data3));
                                    }
                                });
                            }
                        });
                    }
                });


                break;
        case 'other' :
      connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x, y FROM Angelling.Voluntary where srvcClCode like ?', '기타%',function(error,data){
                    if(error!=undefined){
                        res.sendStatus(503);
                    }
                    else{
                        connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x ,y FROM Angelling.Voluntary where srvcClCode like ?', '국제협력%',function(error2, data2){
                            if(error2!=undefined){
                                res.srvcClCode(503);
                            }
                            else{
                                connection.query('SELECT progrmRegistNo, progrmSj, astelno, postAdres, x, y FROM Angelling.Voluntary where srvcClCode like ?', '보건의료%',function(error3,data3){
                                    if(error3!=undefined){
                                        res.srvcClCode(503);
                                    }
                                    else{
                                        res.json(data.concat(data2,data3));

                                    }
                                });
                            }
                        });
                    }
                });


                break;
        default :
                res.send('찾는 데이터가 없습니다.');
                break;
    }

});







module.exports = router;


var mysql=require('mysql');
var pool= mysql.createPool({

    host:'127.0.0.1',
    user :'root',
    password:'Ftdpt0123',
    database:'crud',
    port:3306,
    connectionLimit:100,
   MULTIPLESTATEMENTS:true
  
    

});


module.exports=pool;



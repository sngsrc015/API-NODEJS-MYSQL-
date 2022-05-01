var express = require("express");
var dotenv = require("dotenv");
var morgan = require("morgan");
var bodyparser = require("body-parser");
var pool = require("./pool");
var router = express.Router();
var app = express();

dotenv.config({ path: "config.env" });

//log requests
app.use(morgan("tiny"));

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

var port = process.env.port || 8000;

app.get("/", (req, res) => {
  res.send("crud application");
});

app.listen(port, () => {
  console.log("Server listening at http://localhost:" + port);
});

//insert newrecord database
router.post("/addnewrecord", (req, res) => {
  pool.query(
    "insert into product(id,productname,price,sku)values(?,?,?,?)",
    [req.body.id, req.body.productname, req.body.price, req.body.sku],
    (error, result) => {
      if (error) {
        console.log(error);
        res.render("createform", { msg: "server Error" });
      } else {
        res.render("createform", { msg: "Record Submitted Successfully" });
      }
    }
  );
});

//Get product
router.get("/create", function (req, res) {
  res.render("createform", { msg: "" });
});


//list all employees
router.get("/list", function (req, res) {
  pool.query("Select * From product", (error, result) => {
    if (error) {
      res.render("product", { data: [] });
    } else {
        
      res.render("product", {msg:"", data: result })
    }
  });
});
router.get('/fetchdata',function(req,res){
  pool.query("Select * From product", function(error, result){
    res.status(200).json(result)
})})
//edit product
router.get("/edit", function (req, res) {
  var id = req.query.id;
  var sql = "select * from product where id =?"
  pool.query(sql,[id], function (error, data) {
    
res.render('editform',{data:data[0],msg:''})
});
})

//delete data
router.get("/delete", function (req, res, next) {
  var id = req.query.id
 
  var sql = "DELETE FROM product WHERE id=?";
  pool.query(sql,[id],function(error,data){
    console.log('myfile')
    res.redirect('/show/list')

  });
});


//update newrecord database
router.get("/update", function(req, res)  {
  console.log('updated data')
var sql='UPDATE product set productname=?,price=?,sku=? where id=?'
console.log(req.query)
console.log(req.query.id)
    pool.query(sql,[req.query.productname, req.query.price, req.query.sku,parseInt(req.query.id)],function(error,data) {
    })
     res.redirect('/show/list')
      
});   
      
  //game newrecord database  

  router.get('/g',function(req,res){
    res.render('game')
  })
  

module.exports = router;

var express=require('express');
var pool = require('./pool');
var router=express.Router();

//Get all employees
router.get('/emp',function(req,res){
   pool.query('Select * From Employee', (error, result)=>{
        if(error){
            res.status(500).json([])
        }
        
        else{res.status(200).json(result)}
   
})
});

//Get an data
router.get('/emp/:id',function(req,res){
    pool.query('Select * From Employee where EmpID=?',[req.params.id], (error, result)=>{
         if(error){
             res.status(500).json([])
         }
         
         else{res.status(200).json(result)}
    
 })
 });


 //Delete an employees
router.delete('/emp/:id',function(req,res){
    pool.query('DELETE from Employee where EmpID=?',[req.params.id], (error, result)=>{
         if(error){
             res.SEND('deleted successfully');
         }
         
         else{console.log(error);}
    
 })
 });

 //insert an employees
router.post('/emp/',function(req,res){
    let emp=req.body;
    var sql="Set@EmpID=?;Set@EmpName=?;Set@EmpCode=?;Set@Salary=?;\
    CALL employeeAddOrEdit(@EmpID ,@EmpCode,@EmpName,@Salary);";
    pool.query(sql,[emp.EmpID,emp.EmpName,emp.EmpCode,emp.Salary], (error, rows,fields)=>{
         if(error){
           res.send(rows)
         }
         
         else{console.log(error);}
    
 })
 });


 //update an employees
router.put('/emp/',function(req,res){
    let emp=req.body;
    var sql="Set@EmpID=?;Set@EmpName=?;Set@EmpCode=?;Set@Salary=?;\
    CALL employeeAddOrEdit(@EmpID ,@EmpCode,@EmpName,@Salary);";
    pool.query(sql,[emp.EmpID,emp.EmpName,emp.EmpCode,emp.Salary], (error, rows,fields)=>{
         if(error){
           res.send('UPDATED SUCCEFULLY');
         }
         
         else{console.log(error);}
    
 })
 });

module.exports=router;
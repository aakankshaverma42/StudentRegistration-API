const express = require('express');
const router  =  express.Router();
const Student = require("../model/Schema")
const rateLimit = require('express-rate-limit')


const limiter = rateLimit({
  max: 5,
  windowMs: 10000
})

  router.post('/student',limiter, async(req,res) => {
    console.log(req.body);
    console.log(req.body.groupA);
   try{
        const user = new Student(req.body);
        const createUser =   await user.save();
        res.status(201).send(createUser);
   }catch(e) { res.status(404).send(e); }
});


router.get('/',async(req,res) =>{
    try{
    const readUser =    await Student.find();
    res.send(readUser);
    }catch(e) {res.status('500').send(e)};
   
  });
  
  
  router.get('/:id',async(req,res) =>{
  try{
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    console.log(studentData);
    if(!studentData){
      res.status('404').send();
    }
    else{
    res.send(studentData);
    };
  }catch(e){
      res.status(500).send(e);
  };
  });
  

  router.patch('/:id', async(req,res) =>{
    try{
      const _id = req.params.id;
      const updateStudent = await Student.findByIdAndUpdate(_id,req.body, {
        new : true
      });
      res.status('202').send(updateStudent);
    }catch(e){
      res.status('400').send(e);
    }
  })
  

  router.delete('/:id', async(req,res) =>{
    try{
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if(!req.params.id){
      res.status(404).send();
    }
    else {
      res.status(202).send(deleteStudent);
    };
  }catch(e){
    res.status(500).send(e);
  };
  });
  


module.exports = router;
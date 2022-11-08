const express = require('express');
const router  =  express.Router();
const Student = require("../model/Schema")


  //for creating the data in the api
  router.post('/student', async(req,res) => {
    console.log(req.body);
   try{
        const user = new Student(req.body);
        const createUser =   await user.save();
        res.status(201).send(createUser);
   }catch(e) { res.status(404).send(e); }
});

//for reading the data
router.get('/',async(req,res) =>{
    try{
    const readUser =    await Student.find();
    res.send(readUser);
    }catch(e) {res.status('500').send(e)};
   
  });
  
  //for getting the indivisual student details by using the id which is unquie of each 
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
      res.status('500').send(e);
  };
  });
  
  //for updating the document through the help of the id (particular unique id)
  router.patch('/:id', async(req,res) =>{
    try{
      const _id = req.params.id;
      const updateStudent = await Student.findByIdAndUpdate(_id,req.body, {
        new : true //this basically insure that whatelse we update should show that updated data imediatly
      });
      res.status('202').send(updateStudent);
    }catch(e){
      res.status('400').send(e);
    }
  })
  
  //for deleting the data by using the id
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
var express = require('express');
const { addCourse } = require('../database/course');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a course');
});

router.post("/", async function(req, res){
  const courseData = req.body;

  if(!courseData) 
    return res.status(500).json({error: "Course Data required!", message: "Course data was not received.", status: 500})

    try {
      await addCourse(courseData);
      res.json({message: "Course added successfully!", status: 200})
    } catch (error) {
      res.status(500).json({error , message: "Error while adding course, please try again later.", status: 500})
    }


})

module.exports = router;

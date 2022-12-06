var express = require('express');
const path  = require('path');
const os = require("node:os");
const fs = require('fs');
var router = express.Router();

const pathToUpload = path.join(__dirname, "../public/file/");

/* GET home page. */
router.post('/upload', async function(req, res) {

  const file = req.files?.file;

  
  try {
    // fs.readdirSync(pathToUpload);
    const uploadedFile = await file.mv(pathToUpload+new Date().getTime()+"_"+file.name);
    res.json({
      message: "File uploaded successfully.",
      status: 200
    }).status(200);
    
  } catch (error) {
    console.log(error);
    res.json({
      message: "File failed to upload",
      status: 500
    }).status(500);
  }


  

});

module.exports = router;

var express = require("express");
var router = express.Router();
const path = require("path");

const fileFolderName = "file";
const pathToUpload = path.join(__dirname, `../public/${fileFolderName}/`);

router.post("/", async function (req, res) {
  const file = req.files?.file;

  try {
    // fs.readdirSync(pathToUpload);
    const filename = new Date().getTime() + "_" + file.name;
    const uploadedFile = await file.mv(pathToUpload + filename);
    res
      .json({
        message: "File uploaded successfully.",
        status: 200,
        fileUrl: `/${fileFolderName}/${filename}`,
      })
      .status(200);
  } catch (error) {
    console.log(error);
    res
      .json({
        message: "File failed to upload",
        status: 500,
      })
      .status(500);
  }
});

module.exports = router;
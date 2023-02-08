var express = require("express");
const path = require("path");
const os = require("node:os");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { addUser, findUser } = require("../database/user");
var router = express.Router();

const fileFolderName = "file";
const pathToUpload = path.join(__dirname, `../public/${fileFolderName}/`);

router.post("/upload", async function (req, res) {
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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.sendStatus(401);
  }

  let user = null;

  try {
    [user] = await findUser({ username });
    console.log({ user });

    if (!user)
      return res
        .status(404)
        .send({ message: "User not exist.", success: false });

    if (user.password !== password) {
      throw "Wrong credentials!";
    }
  } catch (error) {
    console.log({ user, error });
    return res.status(500).send({ error: error + "" });
  }

  const token = jwt.sign({ username }, "nbc_secret");
  console.log("Token", token);

  res.send({
    token,
    success: true,
  });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(500).send({
      message: "Username and Password are mandatory.",
    });
  }

  try {
    await addUser({ username, password });

    const token = jwt.sign({ username }, "nbc_secret");
    console.log("Token", token);

    res.send({
      token,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error while creating user, please contact to admin.",
    });
  }
});

module.exports = router;

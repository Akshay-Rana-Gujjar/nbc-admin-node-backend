var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { addUser } = require("../database/user");
router.post("/", async (req, res) => {
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

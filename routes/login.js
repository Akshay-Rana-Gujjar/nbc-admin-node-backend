var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { findUser } = require("../database/user");

router.post("/", async (req, res) => {
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

module.exports = router;

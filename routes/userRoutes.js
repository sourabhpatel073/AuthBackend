const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
userRouter.use(express.json());
//gettin the data

//signup
userRouter.post("/signup", async (req, res) => {
  const { email, password, user_name, age } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      // Store hash in your password DB.
      const user = new UserModel({ email, age, user_name, password: hash });
      await user.save();
      console.log(user);
      res.status(200).send({ msg: "user added successfully" });
    });
  } catch (err) {
    console.log("action is failed due to err");
  }
});
//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }); //passward removed
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          const token = jwt.sign(
            { authorID: user._id, author: user.user_name },
            "masai"
          );
          res.status(200).send({ msg: "login success", token: token });
        } else {
          res.status(200).send({ msg: "wrong details" });
        }
      });
    } else {
      res.status(200).send({ msg: "wrong details" });
    }
  } catch (err) {
    res.status(200).send({ msg: err });
  }
});
module.exports = { userRouter };

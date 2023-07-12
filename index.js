const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const jwt = require("jsonwebtoken");
const { auth } = require("./middlewares/auth,middleware");
const { noteRouter } = require("./routes/noteRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use(auth);
app.use("/notes", noteRouter);
require("dotenv").config()
// app.get("/movies", (req, res) => {
// //   const token = req.headers.authorization;
// //   if (token) {
// //     const decode = jwt.verify(token.split(" ")[1], "masai", (err, decode) => {
// //         if (decode) {
// //           try {
// //             res.status(200).send("moviedata");
// //           } catch (err) {
// //             res.send({ msg: "err" });
// //           }
// //         } else {
// //           res.status(400).send({ err: "login first" });
// //         }
// //       })

// //   } else {
// //     res.status(400).send({ err: "login first" });
// //   }
// //   ;
//   res.status(200).send("movie data")
// });

app.listen(process.env.port, async () => {
  try {
    connection;
    console.log("connected to DB");
  } catch (err) {
    console.log("error", err);
  }
  console.log("server is running");
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const adminRouter = require("./route/adminroute.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://saumyaa:soma2029@cluster0.w38dndu.mongodb.net/admindata?retryWrites=true&w=majority"
);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The token was not available");
  } else {
    jwt.verify(token, "jwt-secrete-key", (err, decoded) => {
      if (err) return res.json("Token is wrong");
      next();
    });
  }
};

app.get("/home", verifyUser, (req, res) => {
  return res.json("Success");
});

app.use("/admin", adminRouter);

app.listen(4001, () => {
  console.log("Server is connected and running");
});

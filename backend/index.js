const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./model/signups");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

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

//login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          return res.json({ Status: "Success" });
        } else {
          return res.json("The password is incorrect");
        }
      });
    } else {
      return res.json("No record existed");
    }
  });
});

//register
app.post("/register", async (req, res) => {
  try {
    // Check if the email is already registered
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email is already registered. Please Login" });
    } else {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user with the hashed password
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      };

      // Save the user to the database
      const createdUser = await userModel.create(newUser);

      // Respond with the created user
      res.json(createdUser);
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(4001, () => {
  console.log("Server is connected and running");
});

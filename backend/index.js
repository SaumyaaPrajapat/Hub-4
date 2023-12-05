const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./model/signups");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const employee = require("./model/employee");

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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const { password, ...others } = user._doc;
      const token = jwt.sign({ email: user.email }, "jwt-secrete-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.status(200).json({ others });
    } else {
      return res
        .status(401)
        .json({ error: "The password is incorrect. Try Again!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
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

//admin
//Admin count
app.get("/admin_count", async (req, res) => {
  try {
    const adminCount = await userModel.countDocuments({ role: "admin" });
    return res.json({ Status: true, Result: adminCount });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ Status: false, Error: "Internal Server Error" });
  }
});
//Admin records
app.get("/admin_records", async (req, res) => {
  try {
    const adminRecords = await userModel.find({ role: "admin" });
    return res.json({ Status: true, Result: adminRecords });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ Status: false, Error: "Internal Server Error" });
  }
});

//employee
app.post("/add_employee", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newEmployee = new employee({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      address: req.body.address,
      salary: req.body.salary,
      category_id: req.body.category_id,
    });
    const savedEmployee = await newEmployee.save();
    return res.json({ Status: true, Result: savedEmployee });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ Status: false, Error: "Internal Server Error" });
  }
});

app.listen(4001, () => {
  console.log("Server is connected and running");
});

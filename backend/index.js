const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./model/signups");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const employee = require("./model/employee");
const category = require("./model/category");

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
// Delete admin
app.delete("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await userModel.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ Status: false, Error: "Admin not found" });
    }
    return res.json({ Status: true, Result: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ Status: false, Error: "Internal Server Error" });
  }
});

//employee
// get employees
app.get("/employee", async (req, res) => {
  try {
    const employees = await employee.find({});
    return res.json({ Status: true, Result: employees });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ Status: false, Error: "Internal Server Error" });
  }
});
//get employees for same user
app.get("/employee/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const employees = await employee.find({ user: userId });
    if (employees.length > 0) {
      res.status(200).json({ employees });
    } else {
      res.status(404).json({ message: "No employees found for this user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//add employee
app.post("/add_employee", async (req, res) => {
  try {
    const { name, email, password, address, salary, id } = req.body;
    const existingUser = await userModel.findById(id);
    if (existingUser) {
      const newEmp = new employee({
        name,
        email,
        password,
        address,
        salary,
      });
      newEmp.user = existingUser._id;
      await newEmp.save();
      existingUser.employee.push(newEmp._id);
      await existingUser.save();
      res.status(200).json({ employee: newEmp });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//delete employee
app.delete("/delete_employee/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    if (!employeeId) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }
    const result = await employee.findByIdAndDelete(employeeId);
    if (result) {
      res
        .status(200)
        .json({ Status: true, Message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ Status: false, Error: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: false, Error: "Internal Server Error" });
  }
});

//category
//get category
app.get("/category", async (req, res) => {
  try {
    const categories = await category.find({});
    return res.json({ Status: true, Result: categories });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ Status: false, Error: "Internal Server Error" });
  }
});

//add category
app.post("/add_category", async (req, res) => {
  try {
    const newCategory = new category({
      name: req.body.name,
      description: req.body.description,
    });
    const savedCategory = await newCategory.save();
    return res.json({ Status: true, Result: savedCategory });
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

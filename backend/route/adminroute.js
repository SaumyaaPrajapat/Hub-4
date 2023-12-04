const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/signups"); // Import your user model
const jwt = require("jsonwebtoken");

const router = express.Router();

//login
route.post("/login", async (req, res) => {
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
router.post("/register", async (req, res) => {
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

module.exports = router;

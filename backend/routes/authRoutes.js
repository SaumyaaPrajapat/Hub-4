const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/signups");

router.use(express.json());

const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Authorization token not provided" });
    }
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        throw err;
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "Token is invalid or expired" });
  }
};

router.get("/home", verifyUser, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const { password, ...others } = user._doc;
      //If crednetials are valid, create a token
      const token = jwt.sign({ userId: user._id }, "jwt-secret-key", {
        expiresIn: "1h",
      });
      return res.status(200).json({ others, token });
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
        role: req.body.role,
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

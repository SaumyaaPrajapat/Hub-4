const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "visitor",
  },
});

const userModel = mongoose.model("signups", signupSchema);
module.exports = userModel;

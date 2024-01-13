const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
});

const userModel = mongoose.model("signups", signupSchema);
module.exports = userModel;

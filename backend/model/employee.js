const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  categorys: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
  },
});

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;

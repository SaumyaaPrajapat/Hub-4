const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  salary: Number,
  address: String,
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

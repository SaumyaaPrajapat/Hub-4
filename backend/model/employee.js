const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  address: String,
  salary: Number,
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
  },
});

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;

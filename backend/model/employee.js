const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
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
  salary: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
    required: true,
  },
});

//index on the "category_id" field
employeeSchema.index({ category_id: 1 });
const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;

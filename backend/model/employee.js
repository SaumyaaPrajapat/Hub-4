const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "signups",
    required: true,
  },
});

//index on the "category_id" field
employeeSchema.index({ category_id: 1 });
const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;

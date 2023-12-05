const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
    ref: "Category",
  },
});

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;

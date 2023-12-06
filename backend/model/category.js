const mongoose = require("mongoose");

// MongoDB category schema (assuming you have a 'category' model)
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const category = mongoose.model("Category", categorySchema);
module.exports = category;

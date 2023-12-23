const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);
app.use("/category", categoryRoutes);

mongoose.connect(
  "mongodb+srv://saumyaa:soma2029@cluster0.w38dndu.mongodb.net/admindata?retryWrites=true&w=majority"
);

app.listen(PORT, () => {
  console.log(`Server is connected and running on port ${PORT}`);
});

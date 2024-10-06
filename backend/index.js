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
  "mongodb+srv://saumyaa:soma2029@cluster0.hhni3ik.mongodb.net/hub-4?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(PORT, () => {
  console.log(`Server is connected and running on port ${PORT}`);
});

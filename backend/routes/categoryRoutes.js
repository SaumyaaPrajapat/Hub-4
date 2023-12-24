const express = require("express");
const router = express.Router();
const category = require("../model/category");
const userModel = require("../model/signups");

//category
//get categories
router.get("/category/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "Invalid or missing user ID" });
    }
    const categories = await category.find({ user: userId });
    if (categories.length > 0) {
      res.status(200).json({ categories });
    } else {
      res.status(404).json({ message: "No categories found for this user" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
//add category
router.post("/add_category", async (req, res) => {
  try {
    const { name, description, id } = req.body;
    const existingUser = await userModel.findById(id);
    if (existingUser) {
      const newCategory = new category({
        name,
        description,
        user: existingUser._id,
      });
      newCategory.user = existingUser._id;
      await newCategory.save();
      existingUser.list.push(newCategory._id);
      await existingUser.save();
      res.status(200).json({ category: newCategory });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//delete category
router.delete("/delete_category/:categoryId", async (req, res) => {
  try {
    const deletedCategory = await category.findByIdAndDelete(
      req.params.categoryId
    );

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ Status: false, Error: "Category not found" });
    }

    return res.json({ Status: true, Result: deletedCategory });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ Status: false, Error: "Internal Server Error" });
  }
});
//update category
router.put("/update_category/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

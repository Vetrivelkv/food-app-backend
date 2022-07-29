const express = require("express");
const router = express.Router();
const CategoryModel = require("../models/categoryModel")({});

router.get("/", async function (req, res, next) {
  try {
    const results = await CategoryModel.getCategory();
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const results = await CategoryModel.postCategory(req.body);
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

router.put("/", async function (req, res, next) {
  try {
    await CategoryModel.updateCategory(req.body);
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const result = await CategoryModel.getCategoryById(req.params.id);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    await CategoryModel.getCategoryById(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

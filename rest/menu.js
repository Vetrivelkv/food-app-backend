const express = require("express");
const router = express.Router();
const MenuModel = require("../models/menuModel")({});

router.get("/", async function (req, res, next) {
  try {
    const results = await MenuModel.getMenu();
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const results = await MenuModel.postMenu(req.body);
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

router.put("/", async function (req, res, next) {
  try {
    await MenuModel.updateMenu(req.body);
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const result = await MenuModel.getMenuById(req.params.id);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    await MenuModel.deleteMenu(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

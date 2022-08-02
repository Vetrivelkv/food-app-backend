const express = require("express");
const router = express.Router();
const CartModel = require("../models/cartModel")({});

router.get("/", async function (req, res, next) {
  try {
    const results = await CartModel.get();
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const results = await CartModel.post(req.body);
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const result = await CartModel.getById(req.params.id);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    await CartModel.delete(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

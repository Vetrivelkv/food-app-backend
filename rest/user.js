const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel")({});

router.get("/:userid", async function (req, res, next) {
  try {
    const results = await UserModel.getbyId(req.params.userid);
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const results = await UserModel.get();
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const results = await UserModel.post(req.body);
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    await UserModel.delete(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const AppInfoModel = require("../models/appInfoModel")({});

router.get("/", async function (req, res, next) {
  try {
    const results = await AppInfoModel.getAppInfo();
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

router.post("/",async function (req, res, next) {
  try {
    const result = await AppInfoModel.createAppInfo(req.body);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

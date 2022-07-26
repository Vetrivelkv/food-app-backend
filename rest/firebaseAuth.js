const express = require("express");
const router = express.Router();
const FirebaseAuthModel = require("../models/firebaseAuthModel")({});


router.get("/getauth", async function (req, res, next) {
  try {
    const idToken = req.body.idtoken;      

    const results = await FirebaseAuthModel.getAuth(idToken);
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

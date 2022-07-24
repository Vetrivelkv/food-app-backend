const express = require("express");
const router = express.Router();
const db = require("../init/database");

router.get("/", async function (req, res, next) {
  try {
    const results = await db.query("SELECT * FROM appinfo");
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const date = new Date();
    const result = await db.query(
      "INSERT INTO appinfo (id,appname,applogo,googleapikey,razorpaykey,hotelname,hoteladdress,latlong,email,phoneno,socialaccounts,created_on) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
      [
        req.body.id,
        req.body.appname,
        req.body.applogo,
        req.body.googleapikey,
        req.body.razorpaykey,
        req.body.hotelname,
        req.body.hoteladdress,
        req.body.latlong,
        req.body.email,
        req.body.phoneno,
        req.body.socialaccounts,
        date
      ]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
      "UPDATE fishes SET name=$1, type=$2 WHERE id=$3 RETURNING *",
      [req.body.name, req.body.type, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const result = await db.query("DELETE FROM fishes WHERE id=$1", [
      req.params.id,
    ]);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

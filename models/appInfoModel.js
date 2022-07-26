"use strict";

const db = require("../init/database");

module.exports = AppInfoModel;

function AppInfoModel(options) {
  if (!(this instanceof AppInfoModel)) return new AppInfoModel(options);
  this.options = options;
  const self = this;
  self.options = options;
}

AppInfoModel.prototype.getAppInfo = async function () {
  const results = await db.query("SELECT * FROM appinfo");
  return results.rows;
};

AppInfoModel.prototype.createAppInfo = async function (params) {
  const date = new Date();

  const result = await db.query(
    "INSERT INTO appinfo (appname,applogo,googleapikey,razorpaykey,hotelname,hoteladdress,latlong,email,phoneno,socialaccounts,created_on) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
    [
      params.appname,
      params.applogo,
      params.googleapikey,
      params.razorpaykey,
      params.hotelname,
      params.hoteladdress,
      params.latlong,
      params.email,
      params.phoneno,
      params.socialaccounts,
      date,
    ]
  );
  console.log(result["rows"][0], "result log");
  return result["rows"][0];
};

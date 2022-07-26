const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const appInfo = require("./rest/appInfo");
const fireBaseRest=require("./rest/firebaseAuth");
const morgan = require("morgan");

// firebase


var admin = require("firebase-admin");
var serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// firebase

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("tiny"));
app.use("/appInfo", appInfo);
app.use("/firebase", fireBaseRest);

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(3001, function () {
  console.log("Server starting on port 3000!");
});

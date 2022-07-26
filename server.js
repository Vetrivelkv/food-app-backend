const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const appInfo = require("./rest/appInfo");
const fireBaseRest = require("./rest/firebaseAuth");
const morgan = require("morgan");
const FireBaseInit = require("./lib/firebaseInit")({});

FireBaseInit.InitializeApp();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("tiny"));
app.use("/appinfo", appInfo);
app.use("/firebase", fireBaseRest);

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(3001, function () {
  console.log("Server starting on port 3000!");
});

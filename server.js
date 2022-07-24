const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const appInfo = require("./rest/appInfo");
const morgan = require("morgan");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("tiny"));
app.use("/appInfo", appInfo);

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});


app.listen(3000, function() {
  console.log("Server starting on port 3000!");
});
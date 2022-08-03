const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fireBaseRest = require("./rest/firebaseAuth");
const morgan = require("morgan");
const FireBaseInit = require("./lib/firebaseInit")({});
const dbscripts = require("./init/dbScriptsRunner");
const appInfo = require("./rest/appInfo");
const category = require("./rest/category");
const menu = require("./rest/menu");
const cart = require("./rest/cart");
const user = require("./rest/user");
const Auth = require("./lib/Auth");

FireBaseInit.InitializeApp();
dbscripts.run();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

// routes
// app.use("/appinfo",Auth.verifyToken, appInfo);
app.use("/appinfo", appInfo);
app.use("/firebase", fireBaseRest);
app.use("/category", category);
app.use("/menu", menu);
app.use("/cart", cart);
app.use("/user", user);
// routes

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(3001, function () {
  console.log("Server starting on port 3000!");
});

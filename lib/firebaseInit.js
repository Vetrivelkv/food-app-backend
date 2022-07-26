// firebase

var admin = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");

module.exports = FireBaseInit;

function FireBaseInit(options) {
  if (!(this instanceof FireBaseInit)) return new FireBaseInit(options);
  this.options = options;
  const self = this;
  self.options = options;
}

FireBaseInit.prototype.InitializeApp = async () => {
  await admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};

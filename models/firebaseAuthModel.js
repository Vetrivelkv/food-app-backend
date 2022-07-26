"use strict";

module.exports = FireBaseAuthModel;

function FireBaseAuthModel(options) {
  if (!(this instanceof FireBaseAuthModel))
    return new FireBaseAuthModel(options);
  this.options = options;
  const self = this;
  self.options = options;
}

/**
 *  getAuth
 * @param token
 */
FireBaseAuthModel.prototype.getAuth = async (idToken) => {
  try {
    console.log("comes here");
    await getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(uid);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (ex) {
    throw ex;
  }
};

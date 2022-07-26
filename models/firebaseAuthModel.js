"use strict";
const { getAuth } = require("firebase-admin/auth");

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
 * @param idtoken
 */
FireBaseAuthModel.prototype.getAuth = async (idToken) => {
  try {
    const results = await getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {        
        return decodedToken;
      })
      .catch((error) => {
        throw error;
      });

    return results;
  } catch (ex) {
    throw ex;
  }
};

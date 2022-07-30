const jwt = require("jsonwebtoken");
const generateJwtToken = {
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign(
      {
        userId: id,
      },
      "test",
      { expiresIn: "7d" }
    );
    console.log(token);
    return token;
  },
};

module.exports = generateJwtToken;

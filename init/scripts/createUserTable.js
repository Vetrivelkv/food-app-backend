const db = require("../database");

const createUserTable = `CREATE TABLE usertable(
    id UUID NOT NULL DEFAULT uuid_generate_v1(),
    firstname VARCHAR ( 150 ) NOT NULL,
    lastname VARCHAR ( 150 ) NOT NULL,
    email VARCHAR ( 150 ),  
    phone VARCHAR(12),
    rewards VARCHAR(20),
    created_on TIMESTAMP,
    PRIMARY KEY(id)
  );`;

module.exports.applyScript = async function () {
  try {
    await db.query(createUserTable);
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      err,
    };
  }
};

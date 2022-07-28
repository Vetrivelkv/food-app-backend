const db = require("../database");

const createCategorytable = `CREATE TABLE category (
	categoryid UUID NOT NULL DEFAULT uuid_generate_v1() ,
	name VARCHAR ( 50 ) NOT NULL,
    value VARCHAR ( 50 ) NOT NULL,
	image VARCHAR ( 50 ) NOT NULL,
    count INTEGER NOT NULL,
    isactive  BOOLEAN DEFAULT TRUE,   
	created_on TIMESTAMP NOT NULL ,
  PRIMARY KEY(categoryid)       
);`;

module.exports.applyScript = async function () {
  try {
    await db.query(createCategorytable);
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

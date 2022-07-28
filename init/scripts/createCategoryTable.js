const db = require("../database");

const createCategorytable = `CREATE TABLE category (
	id UUID NOT NULL DEFAULT uuid_generate_v1() PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL,
    value VARCHAR ( 50 ) NOT NULL,
	image VARCHAR ( 50 ) NOT NULL,
    count INTEGER NOT NULL,
    isactive  BOOLEAN DEFAULT TRUE,   
	created_on TIMESTAMP NOT NULL        
);`;

module.exports.applyScript = async function () {
  try {
    const tables = [ createCategorytable];
    tables.forEach(async (element) => {
      await db.query(element);
    });

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

const db = require("../database");

const createStateTable = `CREATE TABLE STATE(id UUID NOT NULL DEFAULT uuid_generate_v1() PRIMARY KEY, sequence SERIAL, scriptName VARCHAR ( 50 ) NOT NULL);`;
const insertIntoState = `INSERT INTO STATE (scriptname) VALUES('initial-create');`;

module.exports.applyScript = async function () {
  try {
    await db.query(createStateTable);
    await db.query(insertIntoState);

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

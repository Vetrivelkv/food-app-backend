const _scripts = require("./dbscripts");
const db = require("./database");

const createStateTable = `CREATE TABLE STATE(id UUID NOT NULL DEFAULT uuid_generate_v1() PRIMARY KEY, sequence SERIAL, scriptName VARCHAR ( 50 ) NOT NULL);`;
const insertIntoState = `INSERT INTO STATE (scriptname) VALUES('state_table_creation');`;
const checkTableExists = `SELECT to_regclass('public.state');`;

const checkStateLastScript = `SELECT sequence FROM state ORDER BY sequence DESC LIMIT 1;`;

const _runScripts = async function () {
  const hasTable = await db.query(checkTableExists);

  if (hasTable.rows) {
    //state table creation
    if (hasTable.rows[0].to_regclass === null) {
      await db.query(createStateTable);
      await db.query(insertIntoState);
    }
    //state table creation
    else {
      const checkLast = await db.query(checkStateLastScript);
      
      if (checkLast.rows[0].sequence > _scripts.length - 1) {
        console.log("handle migration logic here");
      }
    }
  }
};

module.exports.run = _runScripts;

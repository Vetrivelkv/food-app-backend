const _scripts = require("./dbscripts");
const db = require("./database");

const checkTableExists = `SELECT to_regclass('public.state');`;
const checkStateLastScript = `SELECT sequence,scriptname FROM state ORDER BY sequence DESC LIMIT 1;`;

const _runScripts = async function () {
  const hasTable = await db.query(checkTableExists);

  if (hasTable.rows) {
    //state table creation
    if (hasTable.rows[0].to_regclass === null) {
      await _scripts[0].export.applyScript();
    }
    //state table creation
    const checkLast = await db.query(checkStateLastScript);
    let executeScript = false;
    

    if (checkLast.rows[0].sequence <= _scripts.length) {
      for (const script of _scripts) {
        if (checkLast.rows[0].scriptname == script.key) {          
          executeScript = true;
          continue;
        }
        if (executeScript) {
          await script.export.applyScript();
          const insertIntoState = `INSERT INTO STATE (scriptname) VALUES('${script.key}');`;
          await db.query(insertIntoState);
        }
      }
    }
  }
};

module.exports.run = _runScripts;

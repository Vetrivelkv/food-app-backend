const db = require("../database");

const createCartTable = `CREATE TABLE cart (
  id UUID NOT NULL DEFAULT uuid_generate_v1(),
  name VARCHAR ( 50 ) NOT NULL,
  description VARCHAR ( 50 ),
  value VARCHAR ( 50 ),
  image VARCHAR ( 50 ),
  cartcount INTEGER,
  isactive  BOOLEAN DEFAULT TRUE,  
  categoryid UUID,
  categoryactive BOOLEAN, 
  maxcount INTEGER,
  actualprice DOUBLE PRECISION,
  offerprice DOUBLE PRECISION,
  isoffer BOOLEAN,
  created_on TIMESTAMP,
  userid UUID,
  menuid UUID,    
  PRIMARY KEY(id),
  FOREIGN KEY (menuid) REFERENCES menu(menuid)       
);`;

module.exports.applyScript = async function () {
  try {
    await db.query(createCartTable);
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

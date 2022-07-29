const db = require("../database");

const createMenuTable = `CREATE TABLE menu (
	  menuid UUID NOT NULL DEFAULT uuid_generate_v1(),
	  name VARCHAR ( 50 ) NOT NULL,
    description VARCHAR ( 50 ) NOT NULL,
    value VARCHAR ( 50 ) NOT NULL,
	  image VARCHAR ( 50 ) NOT NULL,
    cartcount INTEGER NOT NULL,
    isactive  BOOLEAN DEFAULT TRUE,  
    parentid UUID,
    parentactive BOOLEAN, 
    maxcount INTEGER NOT NULL,
    actualprice DOUBLE PRECISION NOT NULL,
    offerprice DOUBLE PRECISION NOT NULL,
    isoffer BOOLEAN,
	  created_on TIMESTAMP NOT NULL,
    PRIMARY KEY(menuid),
    FOREIGN KEY (parentid) REFERENCES category(categoryid)   
);`;

module.exports.applyScript = async function () {
  try {
    await db.query(createMenuTable);
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

const db = require("../database");

const createAppInfoTable = `CREATE TABLE appinfo (
	id UUID NOT NULL DEFAULT uuid_generate_v1() PRIMARY KEY,
	appName VARCHAR ( 50 ) NOT NULL,
	appLogo VARCHAR ( 50 ) NOT NULL,
	googleApiKey VARCHAR ( 50 ) NOT NULL,
	razorPayKey VARCHAR ( 50 ) NOT NULL,
	hotelName VARCHAR ( 50 ) NOT NULL,
	hotelAddress VARCHAR ( 50 ) NOT NULL,
	latlong POINT NOT NUll,
	email VARCHAR ( 50 ) NOT NULL,
	phoneNo VARCHAR ( 50 ) NOT NULL,
	socialAccounts VARCHAR (100) NOT NUll,
	created_on TIMESTAMP NOT NULL        
);`;

module.exports.applyScript = async function () {
  try {
    const tables = [ createAppInfoTable];
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

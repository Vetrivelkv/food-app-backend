"use strict";

const db = require("../init/database");

module.exports = UserModel;

function UserModel(options) {
  if (!(this instanceof UserModel)) return new UserModel(options);
  this.options = options;
  const self = this;
  self.options = options;
}

UserModel.prototype.get = async function () {
  const results = await db.query("SELECT * FROM usertable");
  return results.rows;
};

UserModel.prototype.getbyId = async function (userid) {
  console.log(userid);
  const results = await db.query(
    `SELECT * FROM usertable where id='${userid}'`
  );
  return results.rows;
};

UserModel.prototype.post = async function (params) {
  const reqKeys = { ...params, created_on: new Date() };
  const tableColumns = Object.keys(reqKeys);
  const columnValues = Object.values(reqKeys);
  let rowCount = [];
  for (var i = 1; i <= columnValues.length; i++) {
    rowCount.push("$" + `${i}`);
  }
  const result = await db.query(
    `INSERT INTO usertable (${tableColumns}) VALUES (${[
      ...rowCount,
    ]}) RETURNING *`,
    [...columnValues]
  );
  return result.rows[0];
};

UserModel.prototype.delete = async function (id) {
  const results = await db.query(`DELETE * FROM usertable WHERE id='${id}'`);
  return results.rows;
};

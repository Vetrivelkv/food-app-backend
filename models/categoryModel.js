"use strict";

const db = require("../init/database");

module.exports = CategoryModel;

function CategoryModel(options) {
  if (!(this instanceof CategoryModel)) return new CategoryModel(options);
  this.options = options;
  const self = this;
  self.options = options;
}

CategoryModel.prototype.getCategory = async function () {
  const results = await db.query("SELECT * FROM category");
  return results.rows;
};

CategoryModel.prototype.postCategory = async function (params) {
  const reqKeys = { ...params, created_on: new Date() };
  const tableColumns = Object.keys(reqKeys);
  const columnValues = Object.values(reqKeys);
  let rowCount = [];
  for (var i = 1; i <= columnValues.length; i++) {
    rowCount.push("$" + `${i}`);
  }
  const result = await db.query(
    `INSERT INTO category (${tableColumns}) VALUES (${[
      ...rowCount,
    ]}) RETURNING *`,
    [...columnValues]
  );
  return result.rows[0];
};

CategoryModel.prototype.updateCategory = async function (params) {
  const result = await db.query(
    `UPDATE category SET name=$1,value=$2  WHERE categoryid='${params.categoryid}'`,
    [params.name, params.value]
  );

  return result;
};

CategoryModel.prototype.getCategoryById = async function (id) {
  const results = await db.query(
    `SELECT * FROM category WHERE categoryid='${id}'`
  );
  return results.rows;
};

CategoryModel.prototype.deleteCategory = async function (id) {
  const results = await db.query(
    `DELETE * FROM category WHERE categoryid='${id}'`
  );
  return results.rows;
};

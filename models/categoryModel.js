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
  const result = await db.query(
    "INSERT INTO category (name,value,image,count,created_on) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [params.name, params.value, params.image, params.count, new Date()]
  );
  return result["rows"][0];
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

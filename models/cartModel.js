"use strict";

const db = require("../init/database");

module.exports = CartModel;

function CartModel(options) {
  if (!(this instanceof CartModel)) return new CartModel(options);
  this.options = options;
  const self = this;
  self.options = options;
}

CartModel.prototype.get = async function () {
  const results = await db.query("SELECT * FROM cart");
  return results.rows;
};

CartModel.prototype.post = async function (params) {
  try {
    const checkCategory = await db.query(
      `select exists(select 1 from category where categoryid='${params.categoryid}'and isactive='true')`
    );
    if (checkCategory.rows[0].exists) {
      const isMenuActive = await db.query(
        `select exists(select 1 from menu where menuid='${params.menuid}'and isactive='true')`
      );

      if (isMenuActive.rows[0].exists) {
        const reqKeys = { ...params, created_on: new Date() };
        const tableColumns = Object.keys(reqKeys);
        const columnValues = Object.values(reqKeys);
        let rowCount = [];
        for (var i = 1; i <= columnValues.length; i++) {
          rowCount.push("$" + `${i}`);
        }
        const result = await db.query(
          `INSERT INTO cart (${tableColumns}) VALUES (${[
            ...rowCount,
          ]}) RETURNING *`,
          [...columnValues]
        );
        return result.rows[0];
      } else {
        return "Menu is inactive";
      }
    } else {
      return "Category does not exist or it is inactive";
    }
  } catch (err) {
    if (err.constraint === "cart_menuid_fkey") {
      return "Menu does not exist";
    } else {
      return err;
    }
  }
};

CartModel.prototype.getById = async function (id) {
  const results = await db.query(`SELECT * FROM cart WHERE id='${id}'`);
  return results.rows;
};

CartModel.prototype.delete = async function (id) {
  const results = await db.query(`DELETE * FROM cart WHERE id='${id}'`);
  return results.rows;
};

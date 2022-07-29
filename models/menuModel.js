"use strict";

const db = require("../init/database");

module.exports = MenuModel;

function MenuModel(options) {
  if (!(this instanceof MenuModel)) return new MenuModel(options);
  this.options = options;
  const self = this;
  self.options = options;
}

MenuModel.prototype.getMenu = async function () {
  const results = await db.query("SELECT * FROM menu");
  return results.rows;
};

MenuModel.prototype.postMenu = async function (params) {
  const result = await db.query(
    `INSERT INTO menu (name,description,value,image,cartcount,parentid,parentactive,maxcount,actualprice,offerprice,isoffer,created_on) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [
      params.name,
      params.description,
      params.value,
      params.image,
      params.cartcount,
      params.parentid,
      params.parentactive,
      params.maxcount,
      params.actualprice,
      params.offerprice,
      params.isoffer,
      new Date(),
    ]
  );
  return result["rows"][0];
};

MenuModel.prototype.updateMenu = async function (params) {
  const result = await db.query(
    `UPDATE menu SET name=$1,value=$2  WHERE menuid='${params.menuid}'`,
    [params.name, params.value]
  );

  return result;
};

MenuModel.prototype.getMenuById = async function (id) {
  const results = await db.query(`SELECT * FROM menu WHERE menuid='${id}'`);
  return results.rows;
};

MenuModel.prototype.deleteMenu = async function (id) {
  const results = await db.query(`DELETE * FROM menu WHERE menuid='${id}'`);
  return results.rows;
};

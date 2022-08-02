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
  try {
    const reqKeys = { ...params, created_on: new Date() };
    const tableColumns = Object.keys(reqKeys);
    const columnValues = Object.values(reqKeys);
    let rowCount = [];

    for (var i = 1; i <= columnValues.length; i++) {
      rowCount.push("$" + `${i}`);
    }
    const result = await db.query(
      `with new_menu_item as (
      insert into menu (${tableColumns}) VALUES (${[...rowCount]}) RETURNING *
    )
    update category set count =count+1
    where categoryid= (select parentid from new_menu_item);`,
      [...columnValues]
    );

    return result;
  } catch (err) {
    if (err.constraint === "menu_parentid_fkey") {
      return "Category does not exist";
    } else {
    }
    return err;
  }
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

const initial_create = require("./scripts/initialCreate");
const create_appInfo_table = require("./scripts/createAppinfo");
const create_category_table = require("./scripts/createCategoryTable");
const create_menu_table = require("./scripts/createMenuTable");
const createCartTable = require("./scripts/createCartTable");
const createUserTable = require("./scripts/createUserTable");

module.exports = [
  {
    key: "initial-create",
    export: initial_create,
  },
  {
    key: "create-appInfo-table",
    export: create_appInfo_table,
  },
  {
    key: "create_category_table",
    export: create_category_table,
  },
  {
    key: "create_menu_table",
    export: create_menu_table,
  },
  {
    key: "create_cart_table",
    export: createCartTable,
  },
  {
    key: "create_user_table",
    export: createUserTable,
  },
];

const initial_create = require("./scripts/initialCreate");
const create_category_table = require("./scripts/createCategoryTable");

module.exports = [
  {
    key: "initial-create",
    export: initial_create,
  },
  {
    key: "create_category_table",
    export: create_category_table,
  },
];

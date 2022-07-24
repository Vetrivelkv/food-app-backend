const { Client } = require("pg");
const { database } = require("../config.json");

var client = new Client(database);
client.connect();

module.exports = client;

const knex = require('knex');

const knexConfig = require('../knexfile.js');

let environment = process.env.DB_ENV || "development"; // change to testing and then run migrations to create testing db


module.exports = knex(knexConfig[environment]);// [] [] [] []

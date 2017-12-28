"use strict";

const express = require('express');
const router  = express.Router();
let total = 0

module.exports = (knex) => {

  router.get("/", (req, res) => {

    knex('resources')
      .count('id')
      .then((count) => {
        total = (count[0].count) - 2;
        knex('resources')
          .select('id', 'title', 'description', 'screenshot')
          .where('id', '>', total)
          .then((results) => {
            res.json(results);
          });
      });


  }); //router.get end

  return router;
};

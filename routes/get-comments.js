"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    if (req.query.resid) {
      let resourceId = JSON.parse(req.query.resid)
      knex
        .select('c.content', 'u.username', 'c.resource_id')
        .from('comments as c')
        .innerJoin('users as u', 'c.user_id', 'u.id')
        .where('c.resource_id', resourceId)
        .then((results) => {
          res.json(results);
        });
    }
  });
  return router;
};

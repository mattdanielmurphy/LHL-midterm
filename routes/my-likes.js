"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {

    knex('resources')
      .select('id')
      .where('url',req.body.url)
      .then((result) => {
        knex('likes')
          .insert({
            resource_id: result[0].id,
            user_id: req.session.id,
            like: req.body.likeValue
          })
          .then((result) => {
          })
          .catch((err) => {
            console.log(err)
          });
      })
  }); //router.get end

  return router;
};

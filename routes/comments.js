"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    // console.log(req.body.text, "<-- text area content");
    // console.log(req.session.id, "<-- user id");
    // console.log(req.body.url, "<--backend url")
    knex('resources')
      .select('id')
      .where('url',req.body.url)
      .then((result) => {
        knex('comments')
          .insert({
            user_id: req.session.id,
            resource_id: result[0].id,
            content: req.body.text,
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

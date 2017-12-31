"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    let like = req.body.like
    console.log(req.body.like)
    console.log(req.body.likeValue)
    console.log(req.body.url)

    // true is a string because it's inside data object
    if (like === 'true') {
      console.log("inside if")
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
            .then(() => {
            })
            .catch((err) => {
              console.log(err)
            });
        })
    } else {
      console.log("inside else")
        knex('resources')
        .select('id')
        .where('url',req.body.url)
        .then((result) => {
          knex('likes')
            .where('resource_id', result[0].id)
            .andWhere('user_id',req.session.id)
            .del()
            .then(() => {
            })
            .catch((err) => {
              console.log(err)
            });
        })
    }
  }); //router.get end

  return router;
};



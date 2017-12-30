"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select(
          're.id', 're.title', 're.description', 're.url', 're.screenshot',
          'l.like', 'r.value', 'c.content', 'c.created_at',
          'u.username'
        )
      .from('resources AS re')
      .innerJoin('likes AS l', 're.id', 'l.resource_id')
      .innerJoin('comments AS c', 're.id', 'c.resource_id')
      .innerJoin('ratings AS r', 're.id', 'r.resource_id')
      .innerJoin('users AS u', 're.user_id', 'u.id')
      .where('u.id', req.session.id)
      .then((results) => {
        res.json(results);
      });


  }); //router.get end

  return router;
};

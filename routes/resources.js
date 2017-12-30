"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    if (req.query["types"]) {
      let filterTypes = JSON.parse(req.query.types).data;

      console.log(filterTypes, 'filter types')
        knex
          .distinct('re.id','re.url')
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
          .innerJoin('resources_tags AS rt', 're.id', 'rt.resource_id')
          .innerJoin('tags AS t', 't.id', 'rt.tag_id')
          .whereIn('t.type', filterTypes)
          .then((results) => {
            res.json(results);
          });
    } else {
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
        .then((results) => {
          res.json(results);
        });
    }
  });
  return router;
};

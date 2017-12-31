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
              'l.like', 'r.value',
              'u.username'
            )
          .from('resources AS re')
          .fullOuterJoin('likes AS l', 're.id', 'l.resource_id')
          .fullOuterJoin('comments AS c', 're.id', 'c.resource_id')
          .fullOuterJoin('ratings AS r', 're.id', 'r.resource_id')
          .fullOuterJoin('users AS u', 're.user_id', 'u.id')
          .fullOuterJoin('resources_tags AS rt', 're.id', 'rt.resource_id')
          .fullOuterJoin('tags AS t', 't.id', 'rt.tag_id')
          .whereIn('t.type', filterTypes)
          .then((results) => {
            res.json(results);
          });
    } else {
      knex
        .distinct('re.id','re.url')
        .select(
            're.id', 're.title', 're.description', 're.url', 're.screenshot',
            'l.like', 'r.value',
            'u.username'
          )
        .from('resources AS re')
        .fullOuterJoin('likes AS l', 're.id', 'l.resource_id')
        .fullOuterJoin('comments AS c', 're.id', 'c.resource_id')
        .fullOuterJoin('ratings AS r', 're.id', 'r.resource_id')
        .fullOuterJoin('users AS u', 're.user_id', 'u.id')
        .then((results) => {
          res.json(results);
        });
    }
  });
  return router;
};

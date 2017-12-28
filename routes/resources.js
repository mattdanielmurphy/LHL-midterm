"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    if (req.query["types"]) {
      let filterTypes = JSON.parse(req.query.types).data;

      console.log(filterTypes, 'filter types')
        knex
          .distinct('resource_id','resources.url')
          .select('resources.id', 'resources.url', 'resources.title', 'resources.description', 'resources.screenshot')
          .from('resources')
          .fullOuterJoin('resources_tags','resources.id','resources_tags.resource_id')
          .fullOuterJoin('tags','resources_tags.tag_id','tags.id')
          .whereIn('tags.type', filterTypes)
          .then((results) => {
            res.json(results);
          });
    } else {
      knex
        .select('*')
        .from('resources')
        .then((results) => {
          res.json(results);
        });
    }
  });
  return router;
};

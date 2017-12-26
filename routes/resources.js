"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    if (req.query["types"]) {
    let filterTypes = JSON.parse(req.query.types).data;
    console.log(filterTypes, 'filter types')
      knex('resources_tags')
        .join("resources", "resources.id", "resources_tags.resource_id")
        .join("tags", "resources_tags.tag_id", "tags.id")
        .select(
          'resources.id',
          'resources.url',
          'resources.title',
          'resources.description',
          'resources.screenshot',
          'resources_tags.tag_id',
          'resources_tags.resource_id',
          'tags.id',
          'tags.type'
          )
        .whereIn("tags.type", filterTypes)
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

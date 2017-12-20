
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('resources', function (table) {
      table.increments();
      table.string('url');
      table.string('title');
      table.string('description');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('resources')
  ])
};


exports.up = function(knex, Promise) {
  return knex.schema.table('resources', function(table) {
    table.binary('screenshot');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('resources', function(table) {
    table.dropColumn('screenshot');
  })
};

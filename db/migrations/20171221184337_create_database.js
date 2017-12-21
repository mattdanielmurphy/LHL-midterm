
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comment', function (table) {
      table.increments();
      table.foreign('user_id').references('user.id');
      table.foreign('resource_id').references('resources.id');
      table.timestamp('created_at');
      table.timestamp('updated_at');
      table.string('content');
    }),
    knex.schema.createTable('like', function (table) {
      table.increments();
      table.foreign('user_id').references('user.id');
      table.foreign('resource_id').references('resources.id');
      table.integer('like');
    }),
    knex.schema.createTable('rating', function (table) {
      table.increments();
      table.foreign('user_id').references('user.id');
      table.foreign('resource_id').references('resources.id');
      table.integer('value');
    }),
    knex.schema.createTable('resources_tag', function (table) {
      table.increments();
      table.foreign('tag_id').references('tag.id');
      table.foreign('resource_id').references('resources.id');

    }),
    knex.schema.createTable('tag', function (table) {
      table.increments();

    }),

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('resources')
  ])
};


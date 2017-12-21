
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', function (table) {
      table.renameColumn('name', 'username');
      table.string('email');
      table.string('password');
    }),
    knex.schema.alterTable('resources', function (table) {
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
    }),
    knex.schema.createTable('comments', function (table) {
      table.increments();
      table.integer('user_id');
      table.integer('resource_id');
      table.foreign('user_id').references('users.id');
      table.foreign('resource_id').references('resources.id');
      table.timestamp('created_at');
      table.timestamp('updated_at');
      table.string('content');
    }),
    knex.schema.createTable('likes', function (table) {
      table.increments();
      table.integer('user_id');
      table.integer('resource_id');
      table.foreign('user_id').references('users.id');
      table.foreign('resource_id').references('resources.id');
      table.integer('like');
    }),
    knex.schema.createTable('ratings', function (table) {
      table.increments();
      table.integer('user_id');
      table.integer('resource_id');
      table.foreign('user_id').references('users.id');
      table.foreign('resource_id').references('resources.id');
      table.integer('value');
    }),
    knex.schema.createTable('tags', function (table) {
      table.increments();
      table.string('type');
    }),
    knex.schema.createTable('resources_tags', function (table) {
      table.increments();
      table.integer('tag_id');
      table.integer('resource_id');
      table.foreign('tag_id').references('tags.id');
      table.foreign('resource_id').references('resources.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('resources_tags'),
    knex.schema.dropTable('tags'),
    knex.schema.dropTable('ratings'),
    knex.schema.dropTable('likes'),
    knex.schema.dropTable('comments'),
    knex.schema.alterTable('resources', function (table) {
      table.dropForeign('user_id');
      table.dropColumn('user_id');
    }),
    knex.schema.alterTable('users', function (table) {
      table.renameColumn('username', 'name');
      table.dropColumn('email');
      table.dropColumn('password');
    })
  ])
};


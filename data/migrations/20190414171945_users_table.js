exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users
      .string('email', 128)
      .notNullable()
      .unique();
    users.string('name', 128).notNullable();
    users
      .string('username', 128)
      .notNullable()
      .unique();
    users.string('password', 128).notNullable();
    users.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};

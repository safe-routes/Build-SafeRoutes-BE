exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
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
    })

    .createTable('addresses', addresses => {
      addresses.increments();
      addresses
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      addresses.string('address', 256).notNullable();
      addresses.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('groups', groups => {
      groups.increments();
      groups.string('passphrase', 128).notNullable();
      groups
        .string('name', 128)
        .notNullable()
        .unique();
      groups.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('users_groups', users_groups => {
      users_groups.increments();
      users_groups
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      users_groups
        .integer('group_id')
        .unsigned()
        .notNullable()
        .references('groups.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })

    .createTable('messages', messages => {
      messages.increments();
      messages
        .integer('group_id')
        .unsigned()
        .notNullable()
        .references('groups.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      messages
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      messages.string('message', 800).notNullable();
      messages.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('groups')
    .dropTableIfExists('addresses')
    .dropTableIfExists('users_groups')
    .dropTableIfExists('messages');
};
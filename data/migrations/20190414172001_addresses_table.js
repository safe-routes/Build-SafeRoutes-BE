exports.up = function(knex) {
  return knex.schema.createTable('addresses', addresses => {
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
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('addresses');
};

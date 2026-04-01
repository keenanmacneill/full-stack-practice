exports.up = function (knex) {
  return knex.schema.createTable('movies', table => {
    table.increments('id').notNullable().unique();
    table.string('title').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('movies');
};

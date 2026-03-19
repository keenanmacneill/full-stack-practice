/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE pet_type CASCADE');
  await knex('pet_type').del();
  await knex('pet_type').insert([
    { id: 1, name: 'bird' },
    { id: 2, name: 'cat' },
    { id: 3, name: 'dog' },
  ]);
};

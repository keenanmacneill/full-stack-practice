exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE movies RESTART IDENTITY CASCADE');
  await knex('movies').insert([
    { id: 1, title: 'Mean Girls' },
    { id: 2, title: 'Hackers' },
    { id: 3, title: 'The Grey' },
    { id: 4, title: 'Sunshine' },
    { id: 5, title: 'Ex Machina' },
  ]);
};

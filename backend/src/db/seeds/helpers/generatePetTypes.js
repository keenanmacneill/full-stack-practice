const { faker } = require('@faker-js/faker');

exports.generatePetTypes = (count = 10) => {
  const types = faker.helpers.uniqueArray(() => faker.animal.type(), count);

  return types.map(name => ({ name }));
};

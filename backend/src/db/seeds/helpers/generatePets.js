const { faker } = require('@faker-js/faker');
const { generateInt } = require('../helpers/generateInt');

exports.generatePets = () => {
  const pets = [];
  let i = 0;

  do {
    pets.push({
      name: faker.animal.petName(),
      pet_type_id: generateInt(1, 10),
    });
    i++;
  } while (i < 50);

  return pets;
};

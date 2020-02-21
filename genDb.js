const faker = require('faker');

const db = {
  users: [],
};

for (let i = 0; i < 10; i += 1) {
  db.users.push({
    id: faker.random.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    profile_image: faker.image.imageUrl(),
    email: faker.internet.email(),
  });
}

// eslint-disable-next-line no-console
console.log(JSON.stringify(db, undefined, 2));

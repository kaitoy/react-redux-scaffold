const faker = require('faker');

const db = {
  users: [],
  zundokos: [],
  kiyoshies: [],
};

for (let i = 0; i < 10; i += 1) {
  const dob = faker.date.past(20);
  db.users.push({
    id: faker.internet.email(),
    password: faker.internet.password(8),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    dateOfBirth: `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(2, '0')}-${String(
      dob.getDate(),
    ).padStart(2, '0')}`,
  });
}

for (let i = 0; i < 5; i += 1) {
  db.zundokos.push({
    id: faker.random.uuid(),
    saidAt: faker.date.past(1),
    word: faker.random.number(100) > 50 ? 'Zun' : 'Doko',
  });
}

for (let i = 0; i < 3; i += 1) {
  db.kiyoshies.push({
    id: faker.random.uuid(),
    saidAt: faker.date.past(1),
    madeBy: db.users[i],
  });
}

// eslint-disable-next-line no-console
console.log(JSON.stringify(db, undefined, 2));

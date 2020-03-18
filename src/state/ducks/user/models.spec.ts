import {
  User,
  userSamples,
  validateUser,
  validateUserList,
  normalizeUsers,
  denormalizeUsers,
  userNormalizrSchemaKey,
} from './models';

describe('validateUser()', () => {
  test("returns the given object if it's a valid User", (done) => {
    const user = userSamples[0];

    try {
      const validated = validateUser(user);
      expect(validated).toBe(user);
    } catch (err) {
      done.fail(err);
    }

    done();
  });

  describe('throws an error if the given object is not a valid User', () => {
    test('User.id is null', (done) => {
      const users = userSamples;
      const user: User = { ...users[0], id: null };

      try {
        validateUser(user);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('User.id is not a string', (done) => {
      type InvalidUser = Omit<User, 'id'> & {
        id: number;
      };
      const users = userSamples;
      const user: InvalidUser = { ...users[0], id: 123 };

      try {
        validateUser(user);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('User.id is not a valid email address', (done) => {
      const users = userSamples;
      const user: User = { ...users[0], id: 'a219bbd4-522c-489f-838b-e1b18963bf05' };

      try {
        validateUser(user);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('User.password is null', (done) => {
      const users = userSamples;
      const user: User = { ...users[0], password: null };

      try {
        validateUser(user);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('User.password is not a string', (done) => {
      type InvalidUser = Omit<User, 'password'> & {
        password: number;
      };
      const users = userSamples;
      const user: InvalidUser = { ...users[0], password: 1584798224188 };

      try {
        validateUser(user);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('User.name is null', (done) => {
      const users = userSamples;
      const user: User = { ...users[0], name: null };

      try {
        validateUser(user);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('User.name is not a string', (done) => {
      type InvalidUser = Omit<User, 'name'> & {
        name: number;
      };
      const users = userSamples;
      const user: InvalidUser = { ...users[0], name: 5555 };

      try {
        validateUser(user);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('User.dateOfBirth is null', (done) => {
      const users = userSamples;
      const user: User = { ...users[0], dateOfBirth: null };

      try {
        validateUser(user);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('User.dateOfBirth is not a string', (done) => {
      type InvalidUser = Omit<User, 'dateOfBirth'> & {
        dateOfBirth: number;
      };
      const users = userSamples;
      const user: InvalidUser = { ...users[0], dateOfBirth: 19831214 };

      try {
        validateUser(user);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('User.dateOfBirth has an invalid format', (done) => {
      {
        const users = userSamples;
        const user: User = { ...users[0], dateOfBirth: 'Hoge' };

        try {
          validateUser(user);
          done.fail('validateUser() should throw an error');
        } catch (ex) {
          // pass
        }

        done();
      }

      {
        const users = userSamples;
        const user: User = { ...users[0], dateOfBirth: '1983/12/14' };

        try {
          validateUser(user);
          done.fail('validateUser() should throw an error');
        } catch (ex) {
          // pass
        }

        done();
      }

      {
        const users = userSamples;
        const user: User = { ...users[0], dateOfBirth: '19831214' };

        try {
          validateUser(user);
          done.fail('validateUser() should throw an error');
        } catch (ex) {
          // pass
        }

        done();
      }

      {
        const users = userSamples;
        const user: User = { ...users[0], dateOfBirth: '12-14' };

        try {
          validateUser(user);
          done.fail('validateUser() should throw an error');
        } catch (ex) {
          // pass
        }

        done();
      }
    });

    test('undefined', (done) => {
      try {
        validateUser(undefined);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('null', (done) => {
      try {
        validateUser(null);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('array', (done) => {
      try {
        validateUser(userSamples);
        done.fail('validateUser() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });
  });
});

describe('validateUserList()', () => {
  describe("returns the given object if it's a valid User list", () => {
    test('empty', (done) => {
      const users = [];

      try {
        const validated = validateUserList(users);
        expect(validated).toBe(users);
      } catch (err) {
        done.fail(err);
      }

      done();
    });

    test('single element', (done) => {
      const users = [userSamples[0]];

      try {
        const validated = validateUserList(users);
        expect(validated).toBe(users);
      } catch (err) {
        done.fail(err);
      }

      done();
    });

    test('3 elements', (done) => {
      const users = userSamples;

      try {
        const validated = validateUserList(users);
        expect(validated).toBe(users);
      } catch (err) {
        done.fail(err);
      }

      done();
    });
  });

  describe('throws an error if the given object is not a valid User list', () => {
    test('includes an invalid User', (done) => {
      const users = [...userSamples];
      users.push({ ...users.pop(), dateOfBirth: null });

      try {
        validateUserList(users);
        done.fail('validateUserList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Not an array', (done) => {
      const user = userSamples[0];

      try {
        validateUserList(user);
        done.fail('validateUserList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Array contains null', (done) => {
      const users = [...userSamples];
      users.push(null);

      try {
        validateUserList(users);
        done.fail('validateUserList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('undefined', (done) => {
      try {
        validateUserList(undefined);
        done.fail('validateUserList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('null', (done) => {
      try {
        validateUserList(null);
        done.fail('validateUserList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });
  });
});

describe('normalizeUsers', () => {
  test('take a list of User and returns an object that has normalized Users and their ID list', () => {
    const users = [...userSamples];

    const normalized = normalizeUsers(users);
    expect(normalized.result).toEqual(users.map((user) => user.id));
    users.forEach((user) => {
      expect(normalized.entities[userNormalizrSchemaKey][user.id]).toEqual(user);
    });
  });
});

describe('denormalizeUsers', () => {
  test('take a normalized User and returns a list of User', () => {
    const users = userSamples.reduce<ReturnType<typeof normalizeUsers>>(
      (map, user) => {
        map.result.push(user.id);
        // eslint-disable-next-line no-param-reassign
        map.entities[userNormalizrSchemaKey][user.id] = user;
        return map;
      },
      { result: [], entities: { [userNormalizrSchemaKey]: {} } },
    );

    const denormalized = denormalizeUsers(users);
    expect(denormalized).toEqual(userSamples);
  });
});

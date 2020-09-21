import {
  Kiyoshi,
  kiyoshiSamples,
  validateKiyoshi,
  validateKiyoshiList,
  normalizeKiyoshies,
  denormalizeKiyoshies,
  kiyoshiNormalizrSchemaKey,
} from './models';
// @ts-ignore  Cannot find module
import { User, userSamples, userNormalizrSchemaKey } from '~/state/ducks/user/models';

describe('validateKiyoshi()', () => {
  test("returns the given object if it's a valid Kiyoshi", (done) => {
    const kiyoshi = kiyoshiSamples[0];

    try {
      const validated = validateKiyoshi(kiyoshi);
      expect(validated).toBe(kiyoshi);
    } catch (err) {
      done.fail(err);
    }

    done();
  });

  describe('throws an error if the given object is not a valid Kiyoshi', () => {
    test('Kiyoshi.id is null', (done) => {
      const kiyoshies = kiyoshiSamples;
      const kiyoshi: Kiyoshi = { ...kiyoshies[0], id: null };

      try {
        validateKiyoshi(kiyoshi);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Kiyoshi.id is not a string', (done) => {
      type InvalidKiyoshi = Omit<Kiyoshi, 'id'> & {
        id: number;
      };
      const kiyoshies = kiyoshiSamples;
      const kiyoshi: InvalidKiyoshi = { ...kiyoshies[0], id: 123 };

      try {
        validateKiyoshi(kiyoshi);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Kiyoshi.id is not a valid UUID', (done) => {
      const kiyoshies = kiyoshiSamples;
      const kiyoshi: Kiyoshi = { ...kiyoshies[0], id: 'abc-123' };

      try {
        validateKiyoshi(kiyoshi);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Kiyoshi.saidAt is null', (done) => {
      const kiyoshies = kiyoshiSamples;
      const kiyoshi: Kiyoshi = { ...kiyoshies[0], saidAt: null };

      try {
        validateKiyoshi(kiyoshi);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Kiyoshi.saidAt is not a string', (done) => {
      type InvalidKiyoshi = Omit<Kiyoshi, 'saidAt'> & {
        saidAt: number;
      };
      const kiyoshies = kiyoshiSamples;
      const kiyoshi: InvalidKiyoshi = { ...kiyoshies[0], saidAt: 1584798224188 };

      try {
        validateKiyoshi(kiyoshi);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Kiyoshi.saidAt is not a timestamp', (done) => {
      const kiyoshies = kiyoshiSamples;
      const kiyoshi: Kiyoshi = { ...kiyoshies[0], saidAt: 'saidAt' };

      try {
        validateKiyoshi(kiyoshi);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Kiyoshi.saidAt is not in ISO 8601 format', (done) => {
      const kiyoshies = kiyoshiSamples;
      const kiyoshi: Kiyoshi = { ...kiyoshies[0], saidAt: '2019/11/28T06:51:20.355Z' };

      try {
        validateKiyoshi(kiyoshi);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Kiyoshi.madeBy is null', (done) => {
      const kiyoshies = kiyoshiSamples;
      const kiyoshi: Kiyoshi = { ...kiyoshies[0], madeBy: null };

      try {
        validateKiyoshi(kiyoshi);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Kiyoshi.madeBy is not a user instance', (done) => {
      {
        type InvalidKiyoshi = Omit<Kiyoshi, 'madeBy'> & {
          madeBy: string;
        };
        const kiyoshies = kiyoshiSamples;
        const kiyoshi: InvalidKiyoshi = { ...kiyoshies[0], madeBy: 'kaitoy@pcap4j.org' };

        try {
          validateKiyoshi(kiyoshi);
          done.fail('validateKiyoshi() should throw an error');
        } catch (ex) {
          // pass
        }
      }

      {
        type InvalidKiyoshi = Omit<Kiyoshi, 'madeBy'> & {
          madeBy: number;
        };
        const kiyoshies = kiyoshiSamples;
        const kiyoshi: InvalidKiyoshi = { ...kiyoshies[0], madeBy: 10 };

        try {
          validateKiyoshi(kiyoshi);
          done.fail('validateKiyoshi() should throw an error');
        } catch (ex) {
          // pass
        }
      }

      done();
    });

    test('Kiyoshi.madeBy is not a valid user object', (done) => {
      type InvalidUser = Omit<User, 'id'> & {
        id: number;
      };
      type InvalidKiyoshi = Omit<Kiyoshi, 'madeBy'> & {
        madeBy: InvalidUser;
      };
      const kiyoshies = kiyoshiSamples;
      const kiyoshi: InvalidKiyoshi = { ...kiyoshies[0], madeBy: { ...userSamples[2], id: 1234 } };

      try {
        validateKiyoshi(kiyoshi);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('undefined', (done) => {
      try {
        validateKiyoshi(undefined);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('null', (done) => {
      try {
        validateKiyoshi(null);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('array', (done) => {
      try {
        validateKiyoshi(kiyoshiSamples);
        done.fail('validateKiyoshi() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });
  });
});

describe('validateKiyoshiList()', () => {
  describe("returns the given object if it's a valid Kiyoshi list", () => {
    test('empty', (done) => {
      const kiyoshies = [];

      try {
        const validated = validateKiyoshiList(kiyoshies);
        expect(validated).toBe(kiyoshies);
      } catch (err) {
        done.fail(err);
      }

      done();
    });

    test('single element', (done) => {
      const kiyoshies = [kiyoshiSamples[0]];

      try {
        const validated = validateKiyoshiList(kiyoshies);
        expect(validated).toBe(kiyoshies);
      } catch (err) {
        done.fail(err);
      }

      done();
    });

    test('multiple elements', (done) => {
      const kiyoshies = kiyoshiSamples;

      try {
        const validated = validateKiyoshiList(kiyoshies);
        expect(validated).toBe(kiyoshies);
      } catch (err) {
        done.fail(err);
      }

      done();
    });
  });

  describe('throws an error if the given object is not a valid Kiyoshi list', () => {
    test('includes an invalid Kiyoshi', (done) => {
      const kiyoshies = [...kiyoshiSamples];
      kiyoshies.push({ ...kiyoshies.pop(), saidAt: null });

      try {
        validateKiyoshiList(kiyoshies);
        done.fail('validateKiyoshiList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Not an array', (done) => {
      const kiyoshi = kiyoshiSamples[0];

      try {
        validateKiyoshiList(kiyoshi);
        done.fail('validateKiyoshiList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Array contains null', (done) => {
      const kiyoshies = [...kiyoshiSamples];
      kiyoshies.push(null);

      try {
        validateKiyoshiList(kiyoshies);
        done.fail('validateKiyoshiList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('undefined', (done) => {
      try {
        validateKiyoshiList(undefined);
        done.fail('validateKiyoshiList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('null', (done) => {
      try {
        validateKiyoshiList(null);
        done.fail('validateKiyoshiList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });
  });
});

describe('normalizeKiyoshies', () => {
  test(
    'take a list of Kiyoshi and returns an object' +
      'that has normalized Kiyoshies and their ID list',
    () => {
      const kiyoshies = [...kiyoshiSamples];
      const normalizedKiyoshies = kiyoshies.map((kiyoshi) => ({
        ...kiyoshi,
        madeBy: kiyoshi.madeBy.id,
      }));

      const normalized = normalizeKiyoshies(kiyoshies);
      expect(normalized.result).toEqual(kiyoshies.map((kiyoshi) => kiyoshi.id));
      normalizedKiyoshies.forEach((kiyoshi, idx) => {
        expect(normalized.entities[kiyoshiNormalizrSchemaKey][kiyoshi.id]).toEqual(kiyoshi);
        expect(normalized.entities[userNormalizrSchemaKey][kiyoshi.madeBy]).toEqual(
          kiyoshies[idx].madeBy,
        );
      });
    },
  );
});

describe('denormalizeKiyoshies', () => {
  test('take a normalized Kiyoshi and returns a list of Kiyoshi', () => {
    const kiyoshies = kiyoshiSamples.reduce<ReturnType<typeof normalizeKiyoshies>>(
      (map, kiyoshi) => {
        map.result.push(kiyoshi.id);
        // eslint-disable-next-line no-param-reassign
        map.entities[kiyoshiNormalizrSchemaKey][kiyoshi.id] = {
          ...kiyoshi,
          madeBy: kiyoshi.madeBy.id,
        };
        // eslint-disable-next-line no-param-reassign
        map.entities[userNormalizrSchemaKey][kiyoshi.madeBy.id] = kiyoshi.madeBy;
        return map;
      },
      { result: [], entities: { [kiyoshiNormalizrSchemaKey]: {}, [userNormalizrSchemaKey]: {} } },
    );

    const denormalized = denormalizeKiyoshies(kiyoshies);
    expect(denormalized).toEqual(kiyoshiSamples);
  });
});

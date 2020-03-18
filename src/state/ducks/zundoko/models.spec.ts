import {
  Zundoko,
  zundokoSamples,
  validateZundoko,
  validateZundokoList,
  normalizeZundokos,
  denormalizeZundokos,
  zundokoNormalizrSchemaKey,
} from './models';

describe('validateZundoko()', () => {
  test("returns the given object if it's a valid Zundoko", (done) => {
    const zundoko = zundokoSamples[0];

    try {
      const validated = validateZundoko(zundoko);
      expect(validated).toBe(zundoko);
    } catch (err) {
      done.fail(err);
    }

    done();
  });

  describe('throws an error if the given object is not a valid Zundoko', () => {
    test('Zundoko.id is null', (done) => {
      const zundokos = zundokoSamples;
      const zundoko: Zundoko = { ...zundokos[0], id: null };

      try {
        validateZundoko(zundoko);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Zundoko.id is not a string', (done) => {
      type InvalidZundoko = Omit<Zundoko, 'id'> & {
        id: number;
      };
      const zundokos = zundokoSamples;
      const zundoko: InvalidZundoko = { ...zundokos[0], id: 123 };

      try {
        validateZundoko(zundoko);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Zundoko.id is not a valid UUID', (done) => {
      const zundokos = zundokoSamples;
      const zundoko: Zundoko = { ...zundokos[0], id: 'abc-123' };

      try {
        validateZundoko(zundoko);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Zundoko.saidAt is null', (done) => {
      const zundokos = zundokoSamples;
      const zundoko: Zundoko = { ...zundokos[0], saidAt: null };

      try {
        validateZundoko(zundoko);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Zundoko.saidAt is not a string', (done) => {
      type InvalidZundoko = Omit<Zundoko, 'saidAt'> & {
        saidAt: number;
      };
      const zundokos = zundokoSamples;
      const zundoko: InvalidZundoko = { ...zundokos[0], saidAt: 1584798224188 };

      try {
        validateZundoko(zundoko);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Zundoko.saidAt is not a timestamp', (done) => {
      const zundokos = zundokoSamples;
      const zundoko: Zundoko = { ...zundokos[0], saidAt: 'saidAt' };

      try {
        validateZundoko(zundoko);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Zundoko.saidAt is not in ISO 8601 format', (done) => {
      const zundokos = zundokoSamples;
      const zundoko: Zundoko = { ...zundokos[0], saidAt: '2019/11/28T06:51:20.355Z' };

      try {
        validateZundoko(zundoko);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Zundoko.word is null', (done) => {
      const zundokos = zundokoSamples;
      const zundoko: Zundoko = { ...zundokos[0], word: null };

      try {
        validateZundoko(zundoko);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Zundoko.word is not a string', (done) => {
      type InvalidZundoko = Omit<Zundoko, 'word'> & {
        word: number;
      };
      const zundokos = zundokoSamples;
      const zundoko: InvalidZundoko = { ...zundokos[0], word: 10 };

      try {
        validateZundoko(zundoko);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Zundoko.word is not "Zun" or "Doko"', (done) => {
      type InvalidZundoko = Omit<Zundoko, 'word'> & {
        word: 'Hoge';
      };
      const zundokos = zundokoSamples;
      const zundoko: InvalidZundoko = { ...zundokos[0], word: 'Hoge' };

      try {
        validateZundoko(zundoko);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('undefined', (done) => {
      try {
        validateZundoko(undefined);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('null', (done) => {
      try {
        validateZundoko(null);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('array', (done) => {
      try {
        validateZundoko(zundokoSamples);
        done.fail('validateZundoko() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });
  });
});

describe('validateZundokoList()', () => {
  describe("returns the given object if it's a valid Zundoko list", () => {
    test('empty', (done) => {
      const zundokos = [];

      try {
        const validated = validateZundokoList(zundokos);
        expect(validated).toBe(zundokos);
      } catch (err) {
        done.fail(err);
      }

      done();
    });

    test('single element', (done) => {
      const zundokos = [zundokoSamples[0]];

      try {
        const validated = validateZundokoList(zundokos);
        expect(validated).toBe(zundokos);
      } catch (err) {
        done.fail(err);
      }

      done();
    });

    test('3 elements', (done) => {
      const zundokos = zundokoSamples;

      try {
        const validated = validateZundokoList(zundokos);
        expect(validated).toBe(zundokos);
      } catch (err) {
        done.fail(err);
      }

      done();
    });
  });

  describe('throws an error if the given object is not a valid Zundoko list', () => {
    test('includes an invalid Zundoko', (done) => {
      const zundokos = [...zundokoSamples];
      zundokos.push({ ...zundokos.pop(), saidAt: null });

      try {
        validateZundokoList(zundokos);
        done.fail('validateZundokoList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Not an array', (done) => {
      const zundoko = zundokoSamples[0];

      try {
        validateZundokoList(zundoko);
        done.fail('validateZundokoList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('Array contains null', (done) => {
      const zundokos = [...zundokoSamples];
      zundokos.push(null);

      try {
        validateZundokoList(zundokos);
        done.fail('validateZundokoList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('undefined', (done) => {
      try {
        validateZundokoList(undefined);
        done.fail('validateZundokoList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });

    test('null', (done) => {
      try {
        validateZundokoList(null);
        done.fail('validateZundokoList() should throw an error');
      } catch (ex) {
        // pass
      }

      done();
    });
  });
});

describe('normalizeZundokos', () => {
  test(
    'take a list of Zundoko and returns an object' +
      'that has normalized Zundokos and their ID list',
    () => {
      const zundokos = [...zundokoSamples];

      const normalized = normalizeZundokos(zundokos);
      expect(normalized.result).toEqual(zundokos.map((zd) => zd.id));
      zundokos.forEach((zd) => {
        expect(normalized.entities[zundokoNormalizrSchemaKey][zd.id]).toEqual(zd);
      });
    },
  );
});

describe('denormalizeZundokos', () => {
  test('take a normalized Zundoko and returns a list of Zundoko', () => {
    const zundokos = zundokoSamples.reduce<ReturnType<typeof normalizeZundokos>>(
      (map, zd) => {
        map.result.push(zd.id);
        // eslint-disable-next-line no-param-reassign
        map.entities[zundokoNormalizrSchemaKey][zd.id] = zd;
        return map;
      },
      { result: [], entities: { [zundokoNormalizrSchemaKey]: {} } },
    );

    const denormalized = denormalizeZundokos(zundokos);
    expect(denormalized).toEqual(zundokoSamples);
  });
});

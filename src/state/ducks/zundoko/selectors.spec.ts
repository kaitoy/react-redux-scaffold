import {
  isZundokoDataReady,
  isZundokoDataBeingPosted,
  isZundokoDataBeingDeleted,
  getZundokos,
  getZundoko,
  isGotToKiyoshi,
} from './selectors';
import { ZundokoState } from './index';
import { zundokoSamples } from './models';

describe('isZundokoDataReady', () => {
  test('returns dataReady in the store.', () => {
    {
      const state: { zundoko: ZundokoState } = {
        zundoko: {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        },
      };

      const ready = isZundokoDataReady(state);
      expect(ready).toBe(false);
    }

    {
      const sampleZd = zundokoSamples[0];
      const state: { zundoko: ZundokoState } = {
        zundoko: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sampleZd.id],
            entities: {
              [sampleZd.id]: sampleZd,
            },
          },
          gotToKiyoshi: false,
        },
      };

      const ready = isZundokoDataReady(state);
      expect(ready).toBe(true);
    }
  });
});

describe('isZundokoDataBeingPosted', () => {
  test('returns dataBeingPosted in the store.', () => {
    {
      const state: { zundoko: ZundokoState } = {
        zundoko: {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        },
      };

      const result = isZundokoDataBeingPosted(state);
      expect(result).toBe(false);
    }

    {
      const sampleZd = zundokoSamples[0];
      const state: { zundoko: ZundokoState } = {
        zundoko: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: false,
          data: {
            ids: [sampleZd.id],
            entities: {
              [sampleZd.id]: sampleZd,
            },
          },
          gotToKiyoshi: false,
        },
      };

      const result = isZundokoDataBeingPosted(state);
      expect(result).toBe(true);
    }
  });
});

describe('isZundokoDataBeingDeleted', () => {
  test('returns dataBeingDeleted in the store.', () => {
    {
      const state: { zundoko: ZundokoState } = {
        zundoko: {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        },
      };

      const result = isZundokoDataBeingDeleted(state);
      expect(result).toBe(true);
    }

    {
      const sampleZd = zundokoSamples[0];
      const state: { zundoko: ZundokoState } = {
        zundoko: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: false,
          data: {
            ids: [sampleZd.id],
            entities: {
              [sampleZd.id]: sampleZd,
            },
          },
          gotToKiyoshi: false,
        },
      };

      const result = isZundokoDataBeingDeleted(state);
      expect(result).toBe(false);
    }
  });
});

describe('getZundokos', () => {
  test('returns a list of all zundokos in the store.', () => {
    {
      const state: { zundoko: ZundokoState } = {
        zundoko: {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        },
      };

      const zundokos = getZundokos(state);
      expect(zundokos).toEqual([]);
    }

    {
      const sampleZd = zundokoSamples[0];
      const state: { zundoko: ZundokoState } = {
        zundoko: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sampleZd.id],
            entities: {
              [sampleZd.id]: sampleZd,
            },
          },
          gotToKiyoshi: false,
        },
      };

      const zundokos = getZundokos(state);
      expect(zundokos).toEqual([sampleZd]);
    }
  });
});

describe('getZundoko', () => {
  test('returns undefined if no zundoko exists.', () => {
    const state: { zundoko: ZundokoState } = {
      zundoko: {
        dataReady: true,
        dataBeingPosted: false,
        dataBeingDeleted: false,
        data: { ids: [], entities: {} },
        gotToKiyoshi: false,
      },
    };

    expect(getZundoko(state, 'test')).toBeUndefined();
    expect(getZundoko(state, '')).toBeUndefined();
  });

  test("returns undefined if zundokos doesn't contain the specified ID.", () => {
    const zd1 = zundokoSamples[0];
    const zd2 = zundokoSamples[1];
    const zd3 = zundokoSamples[2];
    const state: { zundoko: ZundokoState } = {
      zundoko: {
        dataReady: true,
        dataBeingPosted: true,
        dataBeingDeleted: true,
        data: {
          ids: [zd1.id, zd2.id],
          entities: {
            [zd1.id]: zd1,
            [zd2.id]: zd2,
          },
        },
        gotToKiyoshi: false,
      },
    };

    expect(getZundoko(state, zd3.id)).toBeUndefined();
    expect(getZundoko(state, '')).toBeUndefined();
  });

  test('returns a zundoko if zundokos contains the specified ID.', () => {
    const zd1 = zundokoSamples[0];
    const zd2 = zundokoSamples[1];
    const state: { zundoko: ZundokoState } = {
      zundoko: {
        dataReady: true,
        dataBeingPosted: false,
        dataBeingDeleted: false,
        data: {
          ids: [zd1.id, zd2.id],
          entities: {
            [zd1.id]: zd1,
            [zd2.id]: zd2,
          },
        },
        gotToKiyoshi: false,
      },
    };

    expect(getZundoko(state, zd1.id)).toEqual(zd1);
    expect(getZundoko(state, zd2.id)).toEqual(zd2);
  });
});

describe('isGotToKiyoshi', () => {
  test('returns the zun count in the store.', () => {
    {
      const state: { zundoko: ZundokoState } = {
        zundoko: {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        },
      };

      const flag = isGotToKiyoshi(state);
      expect(flag).toBe(false);
    }

    {
      const sampleZd = zundokoSamples[0];
      const state: { zundoko: ZundokoState } = {
        zundoko: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sampleZd.id],
            entities: {
              [sampleZd.id]: sampleZd,
            },
          },
          gotToKiyoshi: true,
        },
      };

      const flag = isGotToKiyoshi(state);
      expect(flag).toBe(true);
    }
  });
});

import {
  isKiyoshiDataReady,
  isKiyoshiDataBeingPosted,
  isKiyoshiDataBeingDeleted,
  getKiyoshies,
  getKiyoshi,
} from './selectors';
import { KiyoshiState } from './reducers';
import { kiyoshiSamples } from './models';
// @ts-ignore  Cannot find module
import { UserState } from '~/state/ducks/user';

describe('isKiyoshiDataReady', () => {
  test('returns dataReady in the store.', () => {
    {
      const state: { kiyoshi: KiyoshiState } = {
        kiyoshi: {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        },
      };

      const ready = isKiyoshiDataReady(state);
      expect(ready).toBe(false);
    }

    {
      const sample = kiyoshiSamples[0];
      const state: { kiyoshi: KiyoshiState } = {
        kiyoshi: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sample.id],
            entities: {
              [sample.id]: sample,
            },
          },
        },
      };

      const ready = isKiyoshiDataReady(state);
      expect(ready).toBe(true);
    }
  });
});

describe('isKiyoshiDataBeingPosted', () => {
  test('returns dataBeingPosted in the store.', () => {
    {
      const state: { kiyoshi: KiyoshiState } = {
        kiyoshi: {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        },
      };

      const result = isKiyoshiDataBeingPosted(state);
      expect(result).toBe(false);
    }

    {
      const sample = kiyoshiSamples[0];
      const state: { kiyoshi: KiyoshiState } = {
        kiyoshi: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: false,
          data: {
            ids: [sample.id],
            entities: {
              [sample.id]: sample,
            },
          },
        },
      };

      const result = isKiyoshiDataBeingPosted(state);
      expect(result).toBe(true);
    }
  });
});

describe('isKiyoshiDataBeingDeleted', () => {
  test('returns dataBeingDeleted in the store.', () => {
    {
      const state: { kiyoshi: KiyoshiState } = {
        kiyoshi: {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        },
      };

      const result = isKiyoshiDataBeingDeleted(state);
      expect(result).toBe(true);
    }

    {
      const sample = kiyoshiSamples[0];
      const state: { kiyoshi: KiyoshiState } = {
        kiyoshi: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: false,
          data: {
            ids: [sample.id],
            entities: {
              [sample.id]: sample,
            },
          },
        },
      };

      const result = isKiyoshiDataBeingDeleted(state);
      expect(result).toBe(false);
    }
  });
});

describe('getKiyoshies', () => {
  test('returns a list of all kiyoshies in the store.', () => {
    {
      const state: { kiyoshi: KiyoshiState; user: Pick<UserState, 'data'> } = {
        kiyoshi: {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        },
        user: {
          data: { ids: [], entities: {} },
        },
      };

      const kiyoshies = getKiyoshies(state);
      expect(kiyoshies).toEqual([]);
    }

    {
      const sample = kiyoshiSamples[0];
      const state: { kiyoshi: KiyoshiState; user: Pick<UserState, 'data'> } = {
        kiyoshi: {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sample.id],
            entities: {
              [sample.id]: { ...sample, madeBy: sample.madeBy.id },
            },
          },
        },
        user: {
          data: {
            ids: [sample.madeBy.id],
            entities: {
              [sample.madeBy.id]: sample.madeBy,
            },
          },
        },
      };

      const kiyoshies = getKiyoshies(state);
      expect(kiyoshies).toEqual([sample]);
    }
  });
});

describe('getKiyoshi', () => {
  test('returns undefined if no kiyoshi exists.', () => {
    const state: { kiyoshi: KiyoshiState; user: Pick<UserState, 'data'> } = {
      kiyoshi: {
        dataReady: true,
        dataBeingPosted: false,
        dataBeingDeleted: false,
        data: { ids: [], entities: {} },
      },
      user: {
        data: {
          ids: [],
          entities: [],
        },
      },
    };

    expect(getKiyoshi(state, 'test')).toBeUndefined();
    expect(getKiyoshi(state, '')).toBeUndefined();
  });

  test("returns undefined if kiyoshies doesn't contain the specified ID.", () => {
    const kiyoshi1 = kiyoshiSamples[0];
    const kiyoshi2 = kiyoshiSamples[1];
    const kiyoshi3 = kiyoshiSamples[2];
    const state: { kiyoshi: KiyoshiState; user: Pick<UserState, 'data'> } = {
      kiyoshi: {
        dataReady: true,
        dataBeingPosted: true,
        dataBeingDeleted: true,
        data: {
          ids: [kiyoshi1.id, kiyoshi2.id],
          entities: {
            [kiyoshi1.id]: { ...kiyoshi1, madeBy: kiyoshi1.madeBy.id },
            [kiyoshi2.id]: { ...kiyoshi2, madeBy: kiyoshi2.madeBy.id },
          },
        },
      },
      user: {
        data: {
          ids: [kiyoshi1.madeBy.id, kiyoshi2.madeBy.id],
          entities: {
            [kiyoshi1.madeBy.id]: kiyoshi1.madeBy,
            [kiyoshi2.madeBy.id]: kiyoshi2.madeBy,
          },
        },
      },
    };

    expect(getKiyoshi(state, kiyoshi3.id)).toBeUndefined();
    expect(getKiyoshi(state, '')).toBeUndefined();
  });

  test('returns a kiyoshi if kiyoshies contains the specified ID.', () => {
    const kiyoshi1 = kiyoshiSamples[0];
    const kiyoshi2 = kiyoshiSamples[1];
    const state: { kiyoshi: KiyoshiState; user: Pick<UserState, 'data'> } = {
      kiyoshi: {
        dataReady: true,
        dataBeingPosted: false,
        dataBeingDeleted: false,
        data: {
          ids: [kiyoshi1.id, kiyoshi2.id],
          entities: {
            [kiyoshi1.id]: { ...kiyoshi1, madeBy: kiyoshi1.madeBy.id },
            [kiyoshi2.id]: { ...kiyoshi2, madeBy: kiyoshi2.madeBy.id },
          },
        },
      },
      user: {
        data: {
          ids: [kiyoshi1.madeBy.id, kiyoshi2.madeBy.id],
          entities: {
            [kiyoshi1.madeBy.id]: kiyoshi1.madeBy,
            [kiyoshi2.madeBy.id]: kiyoshi2.madeBy,
          },
        },
      },
    };

    expect(getKiyoshi(state, kiyoshi1.id)).toEqual(kiyoshi1);
    expect(getKiyoshi(state, kiyoshi2.id)).toEqual(kiyoshi2);
  });
});

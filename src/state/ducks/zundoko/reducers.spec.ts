import { zundokoReducer, setZunCount } from './reducers';
import { ZundokoState } from './index';
import {
  zundokoDataNotReady,
  zundokosBeingFetched,
  zundokosFetchSucceeded,
  zundokoBeingFetched,
  zundokoFetchSucceeded,
  zundokoBeingAdded,
  zundokoPostSucceeded,
  zundokoPostFailed,
  zundokosBeingDeleted,
  zundokosDeleteSucceeded,
  zundokosDeleteFailed,
} from './actions';
import { zundokoSamples } from './models';

describe('zundokoReducer()', () => {
  beforeEach(() => {
    setZunCount(0);
  });

  test('returns the passed state as it is when the dispatched action is not zundoko/*.', () => {
    const action: unknown = {
      type: 'test/zundokosFetchSucceeded',
      payload: {
        zundoko: { zundokos: zundokoSamples },
      },
    };

    {
      const initialState: ZundokoState = {
        dataReady: false,
        dataBeingPosted: false,
        dataBeingDeleted: false,
        data: { ids: [], entities: {} },
        gotToKiyoshi: false,
      };

      const state = zundokoReducer(
        initialState,
        action as ReturnType<typeof zundokosFetchSucceeded>,
      );
      expect(state).toEqual(initialState);
    }

    {
      const sampleZd = zundokoSamples[0];
      const initialState: ZundokoState = {
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
      };

      const state = zundokoReducer(
        initialState,
        action as ReturnType<typeof zundokosFetchSucceeded>,
      );
      expect(state).toEqual(initialState);
    }
  });

  test(
    'returns a state with dataReady set to false ' +
      'when a zundokoDataNotReady action is dispatched.',
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokoDataNotReady());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }

      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokoDataNotReady());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }
    },
  );

  test(
    'returns a state with dataReady set to false ' +
      'when a zundokosBeingFetched action is dispatched.',
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokosBeingFetched());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }

      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokosBeingFetched());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }
    },
  );

  test(
    'returns a state with fetched zundokos and dataReady set to true ' +
      'when a zundokosFetchSucceeded action is dispatched.',
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const fetchedZundokos = [...zundokoSamples];
        const state = zundokoReducer(initialState, zundokosFetchSucceeded(fetchedZundokos));
        expect({ ...state, data: undefined }).toEqual({
          ...initialState,
          dataReady: true,
          data: undefined,
        });
        expect(state.data.ids).toEqual(fetchedZundokos.map((zd) => zd.id));
        fetchedZundokos.forEach((zd) => {
          expect(state.data.entities[zd.id]).toEqual(zd);
        });
      }

      {
        const sampleZd = zundokoSamples[0];
        const initialState: ZundokoState = {
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
        };

        const fetchedZundokos = zundokoSamples.slice(0, 2);
        const state = zundokoReducer(initialState, zundokosFetchSucceeded(fetchedZundokos));
        expect({ ...state, data: undefined }).toEqual({
          ...initialState,
          dataReady: true,
          data: undefined,
        });
        expect(state.data.ids).toEqual(fetchedZundokos.map((zd) => zd.id));
        fetchedZundokos.forEach((zd) => {
          expect(state.data.entities[zd.id]).toEqual(zd);
        });
      }
    },
  );

  test(
    'returns a state with dataReady set to false ' +
      'when a zundokoBeingFetched action is dispatched.',
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokoBeingFetched('test'));
        expect(state).toEqual({ ...initialState, dataReady: false });
      }

      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokoBeingFetched('foo'));
        expect(state).toEqual({ ...initialState, dataReady: false });
      }
    },
  );

  test(
    'returns a state with a fetched zundoko added and dataReady set to true ' +
      'when a zundokoFetchSucceeded action is dispatched and ' +
      "the original state doesn't contain the zundoko.",
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const fetchedZundoko = zundokoSamples[2];
        const state = zundokoReducer(initialState, zundokoFetchSucceeded(fetchedZundoko));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [fetchedZundoko.id],
            entities: {
              [fetchedZundoko.id]: fetchedZundoko,
            },
          },
        });
      }

      {
        const sampleZd = zundokoSamples[0];
        const initialState: ZundokoState = {
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
        };

        const fetchedZundoko = zundokoSamples[1];
        const state = zundokoReducer(initialState, zundokoFetchSucceeded(fetchedZundoko));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [sampleZd.id, fetchedZundoko.id],
            entities: {
              [sampleZd.id]: sampleZd,
              [fetchedZundoko.id]: fetchedZundoko,
            },
          },
        });
      }
    },
  );

  test(
    'returns a state updated with a fetched zundoko and dataReady set to true ' +
      'when a zundokoFetchSucceeded action is dispatched and ' +
      'the original state contains the old version of the zundoko.',
    () => {
      {
        const sampleZd = zundokoSamples[0];
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: {
            ids: [sampleZd.id],
            entities: {
              [sampleZd.id]: sampleZd,
            },
          },
          gotToKiyoshi: false,
        };

        const fetchedZundoko = { ...sampleZd, saidAt: '2123-01-01T06:51:20.355Z' };
        const state = zundokoReducer(initialState, zundokoFetchSucceeded(fetchedZundoko));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [fetchedZundoko.id],
            entities: {
              [fetchedZundoko.id]: fetchedZundoko,
            },
          },
        });
      }

      {
        const sampleZd1 = zundokoSamples[2];
        const sampleZd2 = zundokoSamples[3];
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sampleZd1.id, sampleZd2.id],
            entities: {
              [sampleZd2.id]: sampleZd2,
              [sampleZd1.id]: sampleZd1,
            },
          },
          gotToKiyoshi: false,
        };

        const fetchedZundoko = { ...sampleZd1, saidAt: '2123-01-01T06:51:20.355Z' };
        const state = zundokoReducer(initialState, zundokoFetchSucceeded(fetchedZundoko));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: initialState.data.ids,
            entities: {
              [sampleZd2.id]: sampleZd2,
              [fetchedZundoko.id]: fetchedZundoko,
            },
          },
        });
      }
    },
  );

  test(
    'returns a state with dataBeingPosted set to true ' +
      'when a zundokoBeingAdded action is dispatched.',
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokoBeingAdded());
        expect(state).toEqual({ ...initialState, dataBeingPosted: true });
      }

      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokoBeingAdded());
        expect(state).toEqual({ ...initialState, dataBeingPosted: true });
      }
    },
  );

  test(
    'returns a state with both dataReady and dataBeingPosted set to false ' +
      "when a zundokoPostSucceeded action is dispatched and the Kiyoshi condition isn't satisfied.",
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokoPostSucceeded('Zun'));
        expect(state).toEqual({ ...initialState, dataReady: false, dataBeingPosted: false });
      }

      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokoPostSucceeded('Doko'));
        expect(state).toEqual({ ...initialState, dataReady: false, dataBeingPosted: false });
      }
    },
  );

  test(
    'returns a state with gotToKiyoshi set to true ' +
      'when a zundokoPostSucceeded action is dispatched and the Kiyoshi condition is satisfied.',
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        let state = zundokoReducer(initialState, zundokoPostSucceeded('Zun'));
        expect(state.gotToKiyoshi).toBe(false);
        state = zundokoReducer(state, zundokoPostSucceeded('Zun'));
        expect(state.gotToKiyoshi).toBe(false);
        state = zundokoReducer(state, zundokoPostSucceeded('Zun'));
        expect(state.gotToKiyoshi).toBe(false);
        state = zundokoReducer(state, zundokoPostSucceeded('Zun'));
        expect(state.gotToKiyoshi).toBe(false);
        state = zundokoReducer(state, zundokoPostSucceeded('Doko'));
        expect(state.gotToKiyoshi).toBe(true);
      }

      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        let state = zundokoReducer(initialState, zundokoPostSucceeded('Zun'));
        expect(state.gotToKiyoshi).toBe(false);
        state = zundokoReducer(state, zundokoPostSucceeded('Doko'));
        expect(state.gotToKiyoshi).toBe(false);
        state = zundokoReducer(state, zundokoPostSucceeded('Zun'));
        expect(state.gotToKiyoshi).toBe(false);
        state = zundokoReducer(state, zundokoPostSucceeded('Zun'));
        expect(state.gotToKiyoshi).toBe(false);
        state = zundokoReducer(state, zundokoPostSucceeded('Zun'));
        expect(state.gotToKiyoshi).toBe(false);
        state = zundokoReducer(state, zundokoPostSucceeded('Zun'));
        expect(state.gotToKiyoshi).toBe(false);
        state = zundokoReducer(state, zundokoPostSucceeded('Doko'));
        expect(state.gotToKiyoshi).toBe(true);
      }
    },
  );

  test(
    'returns a state with dataBeingPosted set to false ' +
      'when a zundokoPostFailed action is dispatched.',
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokoPostFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingPosted: false });
      }

      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokoPostFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingPosted: false });
      }
    },
  );

  test(
    'returns a state with dataBeingDeleted set to true ' +
      'when a zundokosBeingDeleted action is dispatched.',
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokosBeingDeleted([]));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: true });
      }

      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokosBeingDeleted([]));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: true });
      }
    },
  );

  test(
    'returns a state with both dataBeingDeleted and dataReady set to false ' +
      'when a zundokosDeleteSucceeded action is dispatched.',
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokosDeleteSucceeded());
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false, dataReady: false });
      }

      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokosDeleteSucceeded());
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false, dataReady: false });
      }
    },
  );

  test(
    'returns a state with dataBeingDeleted set to false ' +
      'when a zundokosDeleteFailed action is dispatched.',
    () => {
      {
        const initialState: ZundokoState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokosDeleteFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false });
      }

      {
        const initialState: ZundokoState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
          gotToKiyoshi: false,
        };

        const state = zundokoReducer(initialState, zundokosDeleteFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false });
      }
    },
  );
});

import { kiyoshiReducer } from './reducers';
import { KiyoshiState } from './index';
import {
  kiyoshiDataNotReady,
  kiyoshiesBeingFetched,
  kiyoshiesFetchSucceeded,
  kiyoshiBeingFetched,
  kiyoshiFetchSucceeded,
  kiyoshiBeingAdded,
  kiyoshiPostSucceeded,
  kiyoshiPostFailed,
  kiyoshiesBeingDeleted,
  kiyoshiesDeleteSucceeded,
  kiyoshiesDeleteFailed,
} from './actions';
import { kiyoshiSamples, NormalizedKiyoshies } from './models';

describe('kiyoshiReducer()', () => {
  test('returns the passed state as it is when the dispatched action is not kiyoshi/*.', () => {
    const action: unknown = {
      type: 'test/kiyoshiesFetchSucceeded',
      payload: {
        kiyoshi: { kiyoshies: kiyoshiSamples },
      },
    };

    {
      const initialState: KiyoshiState = {
        dataReady: false,
        dataBeingPosted: false,
        dataBeingDeleted: false,
        data: { ids: [], entities: {} },
      };

      const state = kiyoshiReducer(
        initialState,
        action as ReturnType<typeof kiyoshiesFetchSucceeded>,
      );
      expect(state).toEqual(initialState);
    }

    {
      const sample = kiyoshiSamples[0];
      const initialState: KiyoshiState = {
        dataReady: true,
        dataBeingPosted: true,
        dataBeingDeleted: true,
        data: {
          ids: [sample.id],
          entities: {
            [sample.id]: sample,
          },
        },
      };

      const state = kiyoshiReducer(
        initialState,
        action as ReturnType<typeof kiyoshiesFetchSucceeded>,
      );
      expect(state).toEqual(initialState);
    }
  });

  test(
    'returns a state with dataReady set to false ' +
      'when a kiyoshiDataNotReady action is dispatched.',
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiDataNotReady());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }

      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiDataNotReady());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }
    },
  );

  test(
    'returns a state with dataReady set to false ' +
      'when a kiyoshiesBeingFetched action is dispatched.',
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiesBeingFetched());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }

      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiesBeingFetched());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }
    },
  );

  test(
    'returns a state with fetched kiyoshies and dataReady set to true ' +
      'when a kiyoshiesFetchSucceeded action is dispatched.',
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const kiyoshiIDs = kiyoshiSamples.map((kiyoshi) => kiyoshi.id);
        const normalizedKiyoshies = kiyoshiSamples.reduce<NormalizedKiyoshies>(
          (kiyoshies, kiyoshi) => ({
            ...kiyoshies,
            [kiyoshi.id]: { ...kiyoshi, madeBy: kiyoshi.madeBy.id },
          }),
          {},
        );
        const state = kiyoshiReducer(
          initialState,
          kiyoshiesFetchSucceeded(kiyoshiIDs, normalizedKiyoshies, []),
        );

        expect(state).toEqual<KiyoshiState>({
          ...initialState,
          dataReady: true,
          data: {
            ids: kiyoshiIDs,
            entities: normalizedKiyoshies,
          },
        });
      }

      {
        const sample = kiyoshiSamples[0];
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sample.id],
            entities: {
              [sample.id]: sample,
            },
          },
        };

        const fetchedKiyoshies = kiyoshiSamples.slice(0, 2);
        const kiyoshiIDs = fetchedKiyoshies.map((kiyoshi) => kiyoshi.id);
        const normalizedKiyoshies = fetchedKiyoshies.reduce<NormalizedKiyoshies>(
          (kiyoshies, kiyoshi) => ({
            ...kiyoshies,
            [kiyoshi.id]: { ...kiyoshi, madeBy: kiyoshi.madeBy.id },
          }),
          {},
        );
        const state = kiyoshiReducer(
          initialState,
          kiyoshiesFetchSucceeded(kiyoshiIDs, normalizedKiyoshies, []),
        );

        expect(state).toEqual<KiyoshiState>({
          ...initialState,
          dataReady: true,
          data: {
            ids: kiyoshiIDs,
            entities: normalizedKiyoshies,
          },
        });
      }
    },
  );

  test(
    'returns a state with dataReady set to false ' +
      'when a kiyoshiBeingFetched action is dispatched.',
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiBeingFetched('test'));
        expect(state).toEqual({ ...initialState, dataReady: false });
      }

      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiBeingFetched('foo'));
        expect(state).toEqual({ ...initialState, dataReady: false });
      }
    },
  );

  test(
    'returns a state with a fetched kiyoshi added and dataReady set to true ' +
      'when a kiyoshiFetchSucceeded action is dispatched and ' +
      "the original state doesn't contain the kiyoshi.",
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const fetchedKiyoshi = kiyoshiSamples[2];
        const normalizedKiyoshi = { ...fetchedKiyoshi, madeBy: fetchedKiyoshi.madeBy.id };
        const state = kiyoshiReducer(initialState, kiyoshiFetchSucceeded(normalizedKiyoshi, null));

        expect(state).toEqual<KiyoshiState>({
          ...initialState,
          dataReady: true,
          data: {
            ids: [fetchedKiyoshi.id],
            entities: {
              [fetchedKiyoshi.id]: normalizedKiyoshi,
            },
          },
        });
      }

      {
        const sample = { ...kiyoshiSamples[0], madeBy: kiyoshiSamples[0].madeBy.id };
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sample.id],
            entities: {
              [sample.id]: sample,
            },
          },
        };

        const fetchedKiyoshi = kiyoshiSamples[1];
        const normalizedKiyoshi = { ...fetchedKiyoshi, madeBy: fetchedKiyoshi.madeBy.id };
        const state = kiyoshiReducer(initialState, kiyoshiFetchSucceeded(normalizedKiyoshi, null));

        expect(state).toEqual<KiyoshiState>({
          ...initialState,
          dataReady: true,
          data: {
            ids: [sample.id, fetchedKiyoshi.id],
            entities: {
              [sample.id]: sample,
              [fetchedKiyoshi.id]: normalizedKiyoshi,
            },
          },
        });
      }
    },
  );

  test(
    'returns a state updated with a fetched kiyoshi and dataReady set to true ' +
      'when a kiyoshiFetchSucceeded action is dispatched and ' +
      'the original state contains the old version of the kiyoshi.',
    () => {
      {
        const sample = kiyoshiSamples[0];
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: {
            ids: [sample.id],
            entities: {
              [sample.id]: sample,
            },
          },
        };

        const fetchedKiyoshi = { ...sample, saidAt: '2123-01-01T06:51:20.355Z' };
        const normalizedKiyoshi = { ...fetchedKiyoshi, madeBy: fetchedKiyoshi.madeBy.id };
        const state = kiyoshiReducer(initialState, kiyoshiFetchSucceeded(normalizedKiyoshi, null));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [fetchedKiyoshi.id],
            entities: {
              [fetchedKiyoshi.id]: normalizedKiyoshi,
            },
          },
        });
      }

      {
        const sample1 = { ...kiyoshiSamples[2], madeBy: kiyoshiSamples[2].madeBy.id };
        const sample2 = { ...kiyoshiSamples[3], madeBy: kiyoshiSamples[3].madeBy.id };
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: {
            ids: [sample1.id, sample2.id],
            entities: {
              [sample2.id]: sample2,
              [sample1.id]: sample1,
            },
          },
        };

        const fetchedKiyoshi = { ...sample1, saidAt: '2123-01-01T06:51:20.355Z' };
        const normalizedKiyoshi = { ...fetchedKiyoshi, madeBy: fetchedKiyoshi.madeBy.id };
        const state = kiyoshiReducer(initialState, kiyoshiFetchSucceeded(normalizedKiyoshi, null));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: initialState.data.ids,
            entities: {
              [sample2.id]: sample2,
              [fetchedKiyoshi.id]: normalizedKiyoshi,
            },
          },
        });
      }
    },
  );

  test(
    'returns a state with dataBeingPosted set to true ' +
      'when a kiyoshiBeingAdded action is dispatched.',
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiBeingAdded({}));
        expect(state).toEqual({ ...initialState, dataBeingPosted: true });
      }

      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiBeingAdded({}));
        expect(state).toEqual({ ...initialState, dataBeingPosted: true });
      }
    },
  );

  test(
    'returns a state with both dataReady and dataBeingPosted set to false ' +
      'when a kiyoshiPostSucceeded action is dispatched.',
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiPostSucceeded());
        expect(state).toEqual({ ...initialState, dataReady: false, dataBeingPosted: false });
      }

      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiPostSucceeded());
        expect(state).toEqual({ ...initialState, dataReady: false, dataBeingPosted: false });
      }
    },
  );

  test(
    'returns a state with dataBeingPosted set to false ' +
      'when a kiyoshiPostFailed action is dispatched.',
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiPostFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingPosted: false });
      }

      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiPostFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingPosted: false });
      }
    },
  );

  test(
    'returns a state with dataBeingDeleted set to true ' +
      'when a kiyoshiesBeingDeleted action is dispatched.',
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiesBeingDeleted([]));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: true });
      }

      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiesBeingDeleted([]));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: true });
      }
    },
  );

  test(
    'returns a state with both dataBeingDeleted and dataReady set to false ' +
      'when a kiyoshiesDeleteSucceeded action is dispatched.',
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiesDeleteSucceeded());
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false, dataReady: false });
      }

      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiesDeleteSucceeded());
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false, dataReady: false });
      }
    },
  );

  test(
    'returns a state with dataBeingDeleted set to false ' +
      'when a kiyoshiesDeleteFailed action is dispatched.',
    () => {
      {
        const initialState: KiyoshiState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiesDeleteFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false });
      }

      {
        const initialState: KiyoshiState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = kiyoshiReducer(initialState, kiyoshiesDeleteFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false });
      }
    },
  );
});

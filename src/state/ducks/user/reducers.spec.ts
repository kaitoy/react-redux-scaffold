import { userReducer } from './reducers';
import { UserState } from './index';
import {
  userDataNotReady,
  usersBeingFetched,
  usersFetchSucceeded,
  userBeingFetched,
  userFetchSucceeded,
  userBeingPosted,
  userPostSucceeded,
  userPostFailed,
  usersBeingDeleted,
  usersDeleteSucceeded,
  usersDeleteFailed,
} from './actions';
import { userSamples } from './models';
// @ts-ignore  Cannot find module
import { kiyoshiSamples } from '~/state/ducks/kiyoshi/models';
// @ts-ignore  Cannot find module
import { kiyoshiFetchSucceeded, kiyoshiesFetchSucceeded } from '~/state/ducks/kiyoshi/actions';

describe('userReducer()', () => {
  test('returns the passed state as it is when the dispatched action is not user/*.', () => {
    const action: unknown = {
      type: 'test/usersFetchSucceeded',
      payload: {
        user: { users: userSamples },
      },
    };

    {
      const initialState: UserState = {
        dataReady: false,
        dataBeingPosted: false,
        dataBeingDeleted: false,
        data: { ids: [], entities: {} },
      };

      const state = userReducer(initialState, action as ReturnType<typeof usersFetchSucceeded>);
      expect(state).toEqual(initialState);
    }

    {
      const sample = userSamples[0];
      const initialState: UserState = {
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

      const state = userReducer(initialState, action as ReturnType<typeof usersFetchSucceeded>);
      expect(state).toEqual(initialState);
    }
  });

  test(
    'returns a state with dataReady set to false ' +
      'when a userDataNotReady action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, userDataNotReady());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }

      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, userDataNotReady());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }
    },
  );

  test(
    'returns a state with dataReady set to false ' +
      'when a usersBeingFetched action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, usersBeingFetched());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }

      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, usersBeingFetched());
        expect(state).toEqual({ ...initialState, dataReady: false });
      }
    },
  );

  test(
    'returns a state with fetched users and dataReady set to true ' +
      'when a usersFetchSucceeded action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const fetchedUsers = [...userSamples];
        const state = userReducer(initialState, usersFetchSucceeded(fetchedUsers));
        expect({ ...state, data: undefined }).toEqual({
          ...initialState,
          dataReady: true,
          data: undefined,
        });
        expect(state.data.ids).toEqual(fetchedUsers.map((user) => user.id));
        fetchedUsers.forEach((user) => {
          expect(state.data.entities[user.id]).toEqual(user);
        });
      }

      {
        const sample = userSamples[0];
        const initialState: UserState = {
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

        const fetchedUsers = userSamples.slice(0, 2);
        const state = userReducer(initialState, usersFetchSucceeded(fetchedUsers));
        expect({ ...state, data: undefined }).toEqual({
          ...initialState,
          dataReady: true,
          data: undefined,
        });
        expect(state.data.ids).toEqual(fetchedUsers.map((user) => user.id));
        fetchedUsers.forEach((user) => {
          expect(state.data.entities[user.id]).toEqual(user);
        });
      }
    },
  );

  test(
    'returns a state with dataReady set to false ' +
      'when a userBeingFetched action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, userBeingFetched('test'));
        expect(state).toEqual({ ...initialState, dataReady: false });
      }

      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, userBeingFetched('foo'));
        expect(state).toEqual({ ...initialState, dataReady: false });
      }
    },
  );

  test(
    'returns a state with a fetched user added and dataReady set to true ' +
      'when a userFetchSucceeded action is dispatched and ' +
      "the original state doesn't contain the user.",
    () => {
      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const fetchedUser = userSamples[2];
        const state = userReducer(initialState, userFetchSucceeded(fetchedUser));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [fetchedUser.id],
            entities: {
              [fetchedUser.id]: fetchedUser,
            },
          },
        });
      }

      {
        const sample = userSamples[0];
        const initialState: UserState = {
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

        const fetchedUser = userSamples[1];
        const state = userReducer(initialState, userFetchSucceeded(fetchedUser));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [sample.id, fetchedUser.id],
            entities: {
              [sample.id]: sample,
              [fetchedUser.id]: fetchedUser,
            },
          },
        });
      }
    },
  );

  test(
    'returns a state updated with a fetched user and dataReady set to true ' +
      'when a userFetchSucceeded action is dispatched and ' +
      'the original state contains the old version of the user.',
    () => {
      {
        const sample = userSamples[0];
        const initialState: UserState = {
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

        const fetchedUser = { ...sample, saidAt: '2123-01-01T06:51:20.355Z' };
        const state = userReducer(initialState, userFetchSucceeded(fetchedUser));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [fetchedUser.id],
            entities: {
              [fetchedUser.id]: fetchedUser,
            },
          },
        });
      }

      {
        const sample1 = userSamples[2];
        const sample2 = userSamples[3];
        const initialState: UserState = {
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

        const fetchedUser = { ...sample1, saidAt: '2123-01-01T06:51:20.355Z' };
        const state = userReducer(initialState, userFetchSucceeded(fetchedUser));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: initialState.data.ids,
            entities: {
              [sample2.id]: sample2,
              [fetchedUser.id]: fetchedUser,
            },
          },
        });
      }
    },
  );

  test(
    'returns a state with dataBeingPosted set to true ' +
      'when a userBeingPosted action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, userBeingPosted(userSamples[0]));
        expect(state).toEqual({ ...initialState, dataBeingPosted: true });
      }

      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, userBeingPosted(userSamples[0]));
        expect(state).toEqual({ ...initialState, dataBeingPosted: true });
      }
    },
  );

  test(
    'returns a state with both dataReady and dataBeingPosted set to false ' +
      'when a userPostSucceeded action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, userPostSucceeded());
        expect(state).toEqual({ ...initialState, dataReady: false, dataBeingPosted: false });
      }

      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, userPostSucceeded());
        expect(state).toEqual({ ...initialState, dataReady: false, dataBeingPosted: false });
      }
    },
  );

  test(
    'returns a state with dataBeingPosted set to false ' +
      'when a userPostFailed action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, userPostFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingPosted: false });
      }

      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, userPostFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingPosted: false });
      }
    },
  );

  test(
    'returns a state with dataBeingDeleted set to true ' +
      'when a usersBeingDeleted action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, usersBeingDeleted([]));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: true });
      }

      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, usersBeingDeleted([]));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: true });
      }
    },
  );

  test(
    'returns a state with both dataBeingDeleted and dataReady set to false ' +
      'when a usersDeleteSucceeded action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, usersDeleteSucceeded());
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false, dataReady: false });
      }

      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, usersDeleteSucceeded());
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false, dataReady: false });
      }
    },
  );

  test(
    'returns a state with dataBeingDeleted set to false ' +
      'when a usersDeleteFailed action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: true,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, usersDeleteFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false });
      }

      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: true,
          dataBeingDeleted: true,
          data: { ids: [], entities: {} },
        };

        const state = userReducer(initialState, usersDeleteFailed({}));
        expect(state).toEqual({ ...initialState, dataBeingDeleted: false });
      }
    },
  );

  test(
    'returns a state updated with fetched users and dataReady set to true ' +
      'when a kiyoshiesFetchSucceeded action is dispatched.',
    () => {
      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: {
            ids: [],
            entities: {},
          },
        };

        const fetchedUsers = {
          [userSamples[0].id]: userSamples[0],
          [userSamples[2].id]: userSamples[2],
        };
        const state = userReducer(initialState, kiyoshiesFetchSucceeded(null, null, fetchedUsers));

        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [userSamples[0].id, userSamples[2].id],
            entities: {
              [userSamples[0].id]: userSamples[0],
              [userSamples[2].id]: userSamples[2],
            },
          },
        });
      }

      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: {
            ids: [userSamples[0].id, userSamples[1].id, userSamples[2].id],
            entities: {
              [userSamples[0].id]: userSamples[0],
              [userSamples[1].id]: userSamples[1],
              [userSamples[2].id]: userSamples[2],
            },
          },
        };

        const fetchedUsers = {
          [userSamples[1].id]: { ...userSamples[1], saidAt: '2123-01-01T06:51:20.355Z' },
          [userSamples[2].id]: userSamples[2],
          [userSamples[3].id]: userSamples[3],
        };
        const state = userReducer(initialState, kiyoshiesFetchSucceeded(null, null, fetchedUsers));

        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [userSamples[0].id, userSamples[1].id, userSamples[2].id, userSamples[3].id],
            entities: {
              [userSamples[0].id]: userSamples[0],
              [userSamples[1].id]: { ...userSamples[1], saidAt: '2123-01-01T06:51:20.355Z' },
              [userSamples[2].id]: userSamples[2],
              [userSamples[3].id]: userSamples[3],
            },
          },
        });
      }
    },
  );

  test(
    'returns a state with a fetched user added and dataReady set to true ' +
      'when a kiyoshiFetchSucceeded action is dispatched and ' +
      "the original state doesn't contain the user.",
    () => {
      {
        const initialState: UserState = {
          dataReady: false,
          dataBeingPosted: false,
          dataBeingDeleted: false,
          data: { ids: [], entities: {} },
        };

        const fetchedKiyoshi = kiyoshiSamples[2];
        const state = userReducer(initialState, kiyoshiFetchSucceeded(null, fetchedKiyoshi.madeBy));

        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [fetchedKiyoshi.madeBy.id],
            entities: { [fetchedKiyoshi.madeBy.id]: fetchedKiyoshi.madeBy },
          },
        });
      }

      {
        const sample = userSamples[0];
        const initialState: UserState = {
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

        const fetchedKiyoshi = kiyoshiSamples[2];
        const state = userReducer(initialState, kiyoshiFetchSucceeded(null, fetchedKiyoshi.madeBy));

        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [sample.id, fetchedKiyoshi.madeBy.id],
            entities: {
              [sample.id]: sample,
              [fetchedKiyoshi.madeBy.id]: fetchedKiyoshi.madeBy,
            },
          },
        });
      }
    },
  );

  test(
    'returns a state updated with a fetched user and dataReady set to true ' +
      'when a kiyoshiFetchSucceeded action is dispatched and ' +
      'the original state contains the old version of the user.',
    () => {
      {
        const sample = userSamples[0];
        const initialState: UserState = {
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

        const fetchedUser = { ...sample, saidAt: '2123-01-01T06:51:20.355Z' };
        const state = userReducer(initialState, kiyoshiFetchSucceeded(null, fetchedUser));

        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: [fetchedUser.id],
            entities: {
              [fetchedUser.id]: fetchedUser,
            },
          },
        });
      }

      {
        const sample1 = userSamples[2];
        const sample2 = userSamples[3];
        const initialState: UserState = {
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

        const fetchedUser = { ...sample1, saidAt: '2123-01-01T06:51:20.355Z' };
        const state = userReducer(initialState, kiyoshiFetchSucceeded(null, fetchedUser));
        expect(state).toEqual({
          ...initialState,
          dataReady: true,
          data: {
            ids: initialState.data.ids,
            entities: {
              [sample2.id]: sample2,
              [fetchedUser.id]: fetchedUser,
            },
          },
        });
      }
    },
  );
});

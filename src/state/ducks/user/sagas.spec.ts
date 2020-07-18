import { runSaga } from 'redux-saga';
import { userSamples } from './models';
import { fetchUsers, fetchUser, postUser, deleteUsers } from './sagas';
import {
  userBeingFetched,
  userFetchSucceeded,
  usersFetchSucceeded,
  userBeingPosted,
  usersBeingDeleted,
} from './actions';
import * as apis from './apis';

jest.mock('./apis');

describe('fetchUsers()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a usersFetchSucceeded with fetched users', async () => {
    {
      // @ts-ignore  Property 'mockResolvedValue' does not exist
      apis.getUsers.mockResolvedValue(userSamples);
      const dispatched = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchUsers,
      ).toPromise();

      expect(dispatched.length).toBe(1);
      expect(dispatched[0]).toEqual<ReturnType<typeof usersFetchSucceeded>>({
        type: 'user/entitiesFetchSucceeded',
        payload: {
          user: {
            ids: userSamples.map((user) => user.id),
            entities: userSamples.reduce(
              (users, user) => ({
                ...users,
                [user.id]: user,
              }),
              {},
            ),
          },
        },
      });
    }

    {
      // @ts-ignore  Property 'mockResolvedValue' does not exist
      apis.getUsers.mockResolvedValue([]);
      const dispatched = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchUsers,
      ).toPromise();

      expect(dispatched.length).toBe(1);
      expect(dispatched[0]).toEqual<ReturnType<typeof usersFetchSucceeded>>({
        type: 'user/entitiesFetchSucceeded',
        payload: {
          user: {
            ids: [],
            entities: {},
          },
        },
      });
    }
  });

  test('dispatches a usersFetchFailed and an errorDialogOpened if the fetch failed', async () => {
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.getUsers.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchUsers,
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('user/entitiesFetchFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

describe('fetchUser()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a userFetchSucceeded with a fetched user', async () => {
    const user = userSamples[1];
    // @ts-ignore  Property 'mockResolvedValue' does not exist
    apis.getUser.mockResolvedValue(user);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchUser,
      userBeingFetched(user.id),
    ).toPromise();

    expect(dispatched.length).toBe(1);
    expect(dispatched[0]).toEqual<ReturnType<typeof userFetchSucceeded>>({
      type: 'user/entityFetchSucceeded',
      payload: {
        user: { entity: user },
      },
    });
  });

  test('dispatches a userFetchFailed and an errorDialogOpened if the fetch failed', async () => {
    const user = userSamples[1];
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.getUser.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchUser,
      userBeingFetched(user.id),
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('user/entityFetchFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

describe('postUser()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a userPostSucceeded', async () => {
    const user = userSamples[0];
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      postUser,
      userBeingPosted(user),
    ).toPromise();

    expect(dispatched.length).toBe(1);
    expect(dispatched[0].type).toBe('user/entityPostSucceeded');
  });

  test('dispatches a userPostFailed and an errorDialogOpened if the post failed', async () => {
    const user = userSamples[1];
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.postUser.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      postUser,
      userBeingPosted(user),
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('user/entityPostFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

describe('deleteUsers()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a usersDeleteSucceeded if the deletion succeeded', async () => {
    const user = userSamples[0];
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      deleteUsers,
      usersBeingDeleted([user.id]),
    ).toPromise();

    expect(dispatched.length).toBe(1);
    expect(dispatched[0].type).toBe('user/entitiesDeleteSucceeded');
  });

  test('dispatches a usersDeleteFailed and an errorDialogOpened if the deletion failed', async () => {
    const user = userSamples[0];
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.deleteUsers.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      deleteUsers,
      usersBeingDeleted([user.id]),
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('user/entitiesDeleteFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

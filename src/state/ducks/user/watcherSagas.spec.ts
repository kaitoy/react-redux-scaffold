import { runSaga, stdChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { fetchUsers, fetchUser, postUser, deleteUsers } from './sagas';
import {
  watchUsersBeingFetched,
  watchUserBeingFetched,
  watchUserBeingPosted,
  watchUsersBeingDeleted,
} from './watcherSagas';
import {
  usersBeingFetched,
  usersFetchFailed,
  userBeingFetched,
  userFetchFailed,
  userBeingPosted,
  usersBeingDeleted,
} from './actions';
import { userSamples } from './models';
// @ts-ignore  Cannot find module
import { sleep } from '~/utils';

jest.mock('./sagas');

describe('watchUsersBeingFetched()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not usersBeingFetched is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchUsersBeingFetched,
    );

    const action = usersFetchFailed({});
    chan.put(action);

    expect(fetchUsers).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls fetchUsers once with the dispatched action ' +
      'when a usersBeingFetched action is dispatched',
    async () => {
      const chan = stdChannel();

      const sagaRunner = runSaga(
        {
          channel: chan,
        },
        watchUsersBeingFetched,
      );

      const action = usersBeingFetched();
      chan.put(action);
      sagaRunner.cancel(); // stop watcher
      await sagaRunner.toPromise();

      expect(fetchUsers).toHaveBeenCalledTimes(1);
      expect(fetchUsers).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchUsers once with the dispatched actions ' +
      'when 2 usersBeingFetched actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchUsers.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUsersBeingFetched,
      );

      const action = usersBeingFetched();
      chan.put(action);
      chan.put(action);

      expect(fetchUsers).toHaveBeenCalledTimes(1);
      expect(fetchUsers).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchUsers twice with the dispatched actions ' +
      'when 2 usersBeingFetched actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchUsers.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUsersBeingFetched,
      );

      const action = usersBeingFetched();
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(fetchUsers).toHaveBeenCalledTimes(2);
      expect(fetchUsers).toHaveBeenNthCalledWith(1, action);
      expect(fetchUsers).toHaveBeenNthCalledWith(2, action);
    },
  );
});

describe('watchUserBeingFetched()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not userBeingFetched is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchUserBeingFetched,
    );

    const action = userFetchFailed({});
    chan.put(action);

    expect(fetchUser).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls fetchUser once with the dispatched action ' +
      'when a usersBeingFetched action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUserBeingFetched,
      );

      const action = userBeingFetched('hoge');
      chan.put(action);

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(fetchUser).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchUser once with the dispatched actions ' +
      'when 2 userBeingFetched actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchUser.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUserBeingFetched,
      );

      const action = userBeingFetched('hoge');
      chan.put(action);
      chan.put(action);

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(fetchUser).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchUser twice with the dispatched actions ' +
      'when 2 userBeingFetched actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchUser.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUserBeingFetched,
      );

      const action = userBeingFetched('hoge');
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(fetchUser).toHaveBeenCalledTimes(2);
      expect(fetchUser).toHaveBeenNthCalledWith(1, action);
      expect(fetchUser).toHaveBeenNthCalledWith(2, action);
    },
  );
});

describe('watchUserBeingPosted()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not userBeingPosted is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchUserBeingPosted,
    );

    const action = usersFetchFailed({});
    chan.put(action);

    expect(postUser).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls postUser once with the dispatched action ' +
      'when a userBeingPosted action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUserBeingPosted,
      );

      const action = userBeingPosted(userSamples[0]);
      chan.put(action);

      expect(postUser).toHaveBeenCalledTimes(1);
      expect(postUser).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls postUser once with the dispatched actions ' +
      'when 2 userBeingPosted actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      postUser.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUserBeingPosted,
      );

      const action = userBeingPosted(userSamples[0]);
      chan.put(action);
      chan.put(action);

      expect(postUser).toHaveBeenCalledTimes(1);
      expect(postUser).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls postUser twice with the dispatched actions ' +
      'when 2 userBeingPosted actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      postUser.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUserBeingPosted,
      );

      const action = userBeingPosted(userSamples[0]);
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(postUser).toHaveBeenCalledTimes(2);
      expect(postUser).toHaveBeenNthCalledWith(1, action);
      expect(postUser).toHaveBeenNthCalledWith(2, action);
    },
  );
});

describe('watchUsersBeingDeleted()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not usersBeingDeleted is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchUsersBeingDeleted,
    );

    const action = usersFetchFailed({});
    chan.put(action);

    expect(deleteUsers).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls deleteUsers once with the dispatched action ' +
      'when a usersBeingDeleted action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUsersBeingDeleted,
      );

      const action = usersBeingDeleted(['test']);
      chan.put(action);

      expect(deleteUsers).toHaveBeenCalledTimes(1);
      expect(deleteUsers).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls deleteUsers once with the dispatched actions ' +
      'when 2 usersBeingDeleted actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      deleteUsers.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUsersBeingDeleted,
      );

      const action = usersBeingDeleted(['test']);
      chan.put(action);
      chan.put(action);

      expect(deleteUsers).toHaveBeenCalledTimes(1);
      expect(deleteUsers).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls deleteUsers twice with the dispatched actions ' +
      'when 2 usersBeingDeleted actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      deleteUsers.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchUsersBeingDeleted,
      );

      const action = usersBeingDeleted(['test']);
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(deleteUsers).toHaveBeenCalledTimes(2);
      expect(deleteUsers).toHaveBeenNthCalledWith(1, action);
      expect(deleteUsers).toHaveBeenNthCalledWith(2, action);
    },
  );
});

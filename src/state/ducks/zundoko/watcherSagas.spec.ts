import { runSaga, stdChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { fetchZundokos, fetchZundoko, createAndPostZundoko, deleteZundokos } from './sagas';
import {
  watchZundokosBeingFetched,
  watchZundokoBeingFetched,
  watchZundokoBeingAdded,
  watchZundokosBeingDeleted,
} from './watcherSagas';
import {
  zundokosBeingFetched,
  zundokosFetchFailed,
  zundokoBeingFetched,
  zundokoFetchFailed,
  zundokoBeingAdded,
  zundokosBeingDeleted,
} from './actions';
// @ts-ignore  Cannot find module
import { sleep } from '~/utils';

jest.mock('./sagas');

describe('watchZundokosBeingFetched()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not zundokosBeingFetched is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchZundokosBeingFetched,
    );

    const action = zundokosFetchFailed({});
    chan.put(action);

    expect(fetchZundokos).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls fetchZundokos once with the dispatched action ' +
      'when a zundokosBeingFetched action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokosBeingFetched,
      );

      const action = zundokosBeingFetched();
      chan.put(action);

      expect(fetchZundokos).toHaveBeenCalledTimes(1);
      expect(fetchZundokos).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchZundokos once with the dispatched actions ' +
      'when 2 zundokosBeingFetched actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchZundokos.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokosBeingFetched,
      );

      const action = zundokosBeingFetched();
      chan.put(action);
      chan.put(action);

      expect(fetchZundokos).toHaveBeenCalledTimes(1);
      expect(fetchZundokos).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchZundokos twice with the dispatched actions ' +
      'when 2 zundokosBeingFetched actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchZundokos.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokosBeingFetched,
      );

      const action = zundokosBeingFetched();
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(fetchZundokos).toHaveBeenCalledTimes(2);
      expect(fetchZundokos).toHaveBeenNthCalledWith(1, action);
      expect(fetchZundokos).toHaveBeenNthCalledWith(2, action);
    },
  );
});

describe('watchZundokoBeingFetched()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not zundokoBeingFetched is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchZundokoBeingFetched,
    );

    const action = zundokoFetchFailed({});
    chan.put(action);

    expect(fetchZundoko).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls fetchZundoko once with the dispatched action ' +
      'when a zundokosBeingFetched action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokoBeingFetched,
      );

      const action = zundokoBeingFetched('hoge');
      chan.put(action);

      expect(fetchZundoko).toHaveBeenCalledTimes(1);
      expect(fetchZundoko).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchZundoko once with the dispatched actions ' +
      'when 2 zundokoBeingFetched actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchZundoko.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokoBeingFetched,
      );

      const action = zundokoBeingFetched('hoge');
      chan.put(action);
      chan.put(action);

      expect(fetchZundoko).toHaveBeenCalledTimes(1);
      expect(fetchZundoko).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchZundoko twice with the dispatched actions ' +
      'when 2 zundokoBeingFetched actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchZundoko.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokoBeingFetched,
      );

      const action = zundokoBeingFetched('hoge');
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(fetchZundoko).toHaveBeenCalledTimes(2);
      expect(fetchZundoko).toHaveBeenNthCalledWith(1, action);
      expect(fetchZundoko).toHaveBeenNthCalledWith(2, action);
    },
  );
});

describe('watchZundokoBeingAdded()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not zundokoBeingAdded is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchZundokoBeingAdded,
    );

    const action = zundokosFetchFailed({});
    chan.put(action);

    expect(createAndPostZundoko).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls createAndPostZundoko once with the dispatched action ' +
      'when a zundokoBeingAdded action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokoBeingAdded,
      );

      const action = zundokoBeingAdded();
      chan.put(action);

      expect(createAndPostZundoko).toHaveBeenCalledTimes(1);
      expect(createAndPostZundoko).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls createAndPostZundoko once with the dispatched actions ' +
      'when 2 zundokoBeingAdded actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      createAndPostZundoko.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokoBeingAdded,
      );

      const action = zundokoBeingAdded();
      chan.put(action);
      chan.put(action);

      expect(createAndPostZundoko).toHaveBeenCalledTimes(1);
      expect(createAndPostZundoko).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls createAndPostZundoko twice with the dispatched actions ' +
      'when 2 zundokoBeingAdded actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      createAndPostZundoko.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokoBeingAdded,
      );

      const action = zundokoBeingAdded();
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(createAndPostZundoko).toHaveBeenCalledTimes(2);
      expect(createAndPostZundoko).toHaveBeenNthCalledWith(1, action);
      expect(createAndPostZundoko).toHaveBeenNthCalledWith(2, action);
    },
  );
});

describe('watchZundokosBeingDeleted()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not zundokosBeingDeleted is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchZundokosBeingDeleted,
    );

    const action = zundokosFetchFailed({});
    chan.put(action);

    expect(deleteZundokos).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls deleteZundokos once with the dispatched action ' +
      'when a zundokosBeingDeleted action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokosBeingDeleted,
      );

      const action = zundokosBeingDeleted(['test']);
      chan.put(action);

      expect(deleteZundokos).toHaveBeenCalledTimes(1);
      expect(deleteZundokos).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls deleteZundokos once with the dispatched actions ' +
      'when 2 zundokosBeingDeleted actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      deleteZundokos.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokosBeingDeleted,
      );

      const action = zundokosBeingDeleted(['test']);
      chan.put(action);
      chan.put(action);

      expect(deleteZundokos).toHaveBeenCalledTimes(1);
      expect(deleteZundokos).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls deleteZundokos twice with the dispatched actions ' +
      'when 2 zundokosBeingDeleted actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      deleteZundokos.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchZundokosBeingDeleted,
      );

      const action = zundokosBeingDeleted(['test']);
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(deleteZundokos).toHaveBeenCalledTimes(2);
      expect(deleteZundokos).toHaveBeenNthCalledWith(1, action);
      expect(deleteZundokos).toHaveBeenNthCalledWith(2, action);
    },
  );
});

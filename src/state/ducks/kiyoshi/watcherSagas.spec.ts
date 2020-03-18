import { runSaga, stdChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { fetchKiyoshies, fetchKiyoshi, createAndPostKiyoshi, deleteKiyoshies } from './sagas';
import {
  watchKiyoshiesBeingFetched,
  watchKiyoshiBeingFetched,
  watchKiyoshiBeingAdded,
  watchKiyoshiesBeingDeleted,
} from './watcherSagas';
import {
  kiyoshiesBeingFetched,
  kiyoshiesFetchFailed,
  kiyoshiBeingFetched,
  kiyoshiFetchFailed,
  kiyoshiBeingAdded,
  kiyoshiesBeingDeleted,
} from './actions';
// @ts-ignore  Cannot find module
import { sleep } from '~/utils';

jest.mock('./sagas');

describe('watchKiyoshiesBeingFetched()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not kiyoshiesBeingFetched is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchKiyoshiesBeingFetched,
    );

    const action = kiyoshiesFetchFailed({});
    chan.put(action);

    expect(fetchKiyoshies).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls fetchKiyoshies once with the dispatched action ' +
      'when a kiyoshiesBeingFetched action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiesBeingFetched,
      );

      const action = kiyoshiesBeingFetched();
      chan.put(action);

      expect(fetchKiyoshies).toHaveBeenCalledTimes(1);
      expect(fetchKiyoshies).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchKiyoshies once with the dispatched actions ' +
      'when 2 kiyoshiesBeingFetched actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchKiyoshies.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiesBeingFetched,
      );

      const action = kiyoshiesBeingFetched();
      chan.put(action);
      chan.put(action);

      expect(fetchKiyoshies).toHaveBeenCalledTimes(1);
      expect(fetchKiyoshies).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchKiyoshies twice with the dispatched actions ' +
      'when 2 kiyoshiesBeingFetched actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchKiyoshies.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiesBeingFetched,
      );

      const action = kiyoshiesBeingFetched();
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(fetchKiyoshies).toHaveBeenCalledTimes(2);
      expect(fetchKiyoshies).toHaveBeenNthCalledWith(1, action);
      expect(fetchKiyoshies).toHaveBeenNthCalledWith(2, action);
    },
  );
});

describe('watchKiyoshiBeingFetched()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not kiyoshiBeingFetched is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchKiyoshiBeingFetched,
    );

    const action = kiyoshiFetchFailed({});
    chan.put(action);

    expect(fetchKiyoshi).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls fetchKiyoshi once with the dispatched action ' +
      'when a kiyoshiesBeingFetched action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiBeingFetched,
      );

      const action = kiyoshiBeingFetched('hoge');
      chan.put(action);

      expect(fetchKiyoshi).toHaveBeenCalledTimes(1);
      expect(fetchKiyoshi).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchKiyoshi once with the dispatched actions ' +
      'when 2 kiyoshiBeingFetched actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchKiyoshi.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiBeingFetched,
      );

      const action = kiyoshiBeingFetched('hoge');
      chan.put(action);
      chan.put(action);

      expect(fetchKiyoshi).toHaveBeenCalledTimes(1);
      expect(fetchKiyoshi).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls fetchKiyoshi twice with the dispatched actions ' +
      'when 2 kiyoshiBeingFetched actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      fetchKiyoshi.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiBeingFetched,
      );

      const action = kiyoshiBeingFetched('hoge');
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(fetchKiyoshi).toHaveBeenCalledTimes(2);
      expect(fetchKiyoshi).toHaveBeenNthCalledWith(1, action);
      expect(fetchKiyoshi).toHaveBeenNthCalledWith(2, action);
    },
  );
});

describe('watchKiyoshiBeingAdded()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not kiyoshiBeingAdded is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchKiyoshiBeingAdded,
    );

    const action = kiyoshiesFetchFailed({});
    chan.put(action);

    expect(createAndPostKiyoshi).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls createAndPostKiyoshi once with the dispatched action ' +
      'when a kiyoshiBeingAdded action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiBeingAdded,
      );

      const action = kiyoshiBeingAdded();
      chan.put(action);

      expect(createAndPostKiyoshi).toHaveBeenCalledTimes(1);
      expect(createAndPostKiyoshi).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls createAndPostKiyoshi once with the dispatched actions ' +
      'when 2 kiyoshiBeingAdded actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      createAndPostKiyoshi.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiBeingAdded,
      );

      const action = kiyoshiBeingAdded();
      chan.put(action);
      chan.put(action);

      expect(createAndPostKiyoshi).toHaveBeenCalledTimes(1);
      expect(createAndPostKiyoshi).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls createAndPostKiyoshi twice with the dispatched actions ' +
      'when 2 kiyoshiBeingAdded actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      createAndPostKiyoshi.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiBeingAdded,
      );

      const action = kiyoshiBeingAdded();
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(createAndPostKiyoshi).toHaveBeenCalledTimes(2);
      expect(createAndPostKiyoshi).toHaveBeenNthCalledWith(1, action);
      expect(createAndPostKiyoshi).toHaveBeenNthCalledWith(2, action);
    },
  );
});

describe('watchKiyoshiesBeingDeleted()', () => {
  beforeEach(() => jest.resetAllMocks());

  test("doesn't call any function when an action that's not kiyoshiesBeingDeleted is dispatched", async () => {
    const chan = stdChannel();
    const effects = [];
    runSaga(
      {
        channel: chan,
        sagaMonitor: {
          effectTriggered: ({ effect }) => effects.push(effect.type),
        },
      },
      watchKiyoshiesBeingDeleted,
    );

    const action = kiyoshiesFetchFailed({});
    chan.put(action);

    expect(deleteKiyoshies).toHaveBeenCalledTimes(0);
    expect(effects[effects.length - 1]).toBe('TAKE'); // means the action is taken but nothing is forked.
  });

  test(
    'calls deleteKiyoshies once with the dispatched action ' +
      'when a kiyoshiesBeingDeleted action is dispatched',
    async () => {
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiesBeingDeleted,
      );

      const action = kiyoshiesBeingDeleted(['test']);
      chan.put(action);

      expect(deleteKiyoshies).toHaveBeenCalledTimes(1);
      expect(deleteKiyoshies).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls deleteKiyoshies once with the dispatched actions ' +
      'when 2 kiyoshiesBeingDeleted actions are quickly dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      deleteKiyoshies.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiesBeingDeleted,
      );

      const action = kiyoshiesBeingDeleted(['test']);
      chan.put(action);
      chan.put(action);

      expect(deleteKiyoshies).toHaveBeenCalledTimes(1);
      expect(deleteKiyoshies).toHaveBeenCalledWith(action);
    },
  );

  test(
    'calls deleteKiyoshies twice with the dispatched actions ' +
      'when 2 kiyoshiesBeingDeleted actions are moderately dispatched',
    async () => {
      function* slowSaga() {
        yield call(sleep, 500);
      }
      // @ts-ignore  Property 'mockImplementation' does not exist
      deleteKiyoshies.mockImplementation(slowSaga);
      const chan = stdChannel();

      runSaga(
        {
          channel: chan,
        },
        watchKiyoshiesBeingDeleted,
      );

      const action = kiyoshiesBeingDeleted(['test']);
      chan.put(action);
      await sleep(800);
      chan.put(action);

      expect(deleteKiyoshies).toHaveBeenCalledTimes(2);
      expect(deleteKiyoshies).toHaveBeenNthCalledWith(1, action);
      expect(deleteKiyoshies).toHaveBeenNthCalledWith(2, action);
    },
  );
});

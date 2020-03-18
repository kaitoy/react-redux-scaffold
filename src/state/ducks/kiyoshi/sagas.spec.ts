import { runSaga } from 'redux-saga';
import { kiyoshiSamples } from './models';
import { fetchKiyoshies, fetchKiyoshi, createAndPostKiyoshi, deleteKiyoshies } from './sagas';
import {
  kiyoshiFetchSucceeded,
  kiyoshiBeingFetched,
  kiyoshiesFetchSucceeded,
  kiyoshiesBeingDeleted,
  kiyoshiBeingAdded,
} from './actions';
import * as apis from './apis';
// @ts-ignore  Cannot find module
import { userSamples } from '~/state/ducks/user/models';

jest.mock('./apis');

describe('fetchKiyoshies()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a kiyoshiesFetchSucceeded with fetched kiyoshies', async () => {
    {
      // @ts-ignore  Property 'mockResolvedValue' does not exist
      apis.getKiyoshies.mockResolvedValue(kiyoshiSamples);
      const dispatched = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchKiyoshies,
      ).toPromise();

      expect(dispatched.length).toBe(1);
      expect(dispatched[0]).toEqual<ReturnType<typeof kiyoshiesFetchSucceeded>>({
        type: 'kiyoshi/entitiesFetchSucceeded',
        payload: {
          kiyoshi: {
            ids: kiyoshiSamples.map((kiyoshi) => kiyoshi.id),
            entities: kiyoshiSamples.reduce(
              (kiyoshies, kiyoshi) => ({
                ...kiyoshies,
                [kiyoshi.id]: { ...kiyoshi, madeBy: kiyoshi.madeBy.id },
              }),
              {},
            ),
          },
          user: {
            entities: kiyoshiSamples.reduce(
              (users, kiyoshi) => ({ ...users, [kiyoshi.madeBy.id]: kiyoshi.madeBy }),
              {},
            ),
          },
        },
      });
    }

    {
      // @ts-ignore  Property 'mockResolvedValue' does not exist
      apis.getKiyoshies.mockResolvedValue([]);
      const dispatched = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchKiyoshies,
      ).toPromise();

      expect(dispatched.length).toBe(1);
      expect(dispatched[0]).toEqual<ReturnType<typeof kiyoshiesFetchSucceeded>>({
        type: 'kiyoshi/entitiesFetchSucceeded',
        payload: {
          kiyoshi: {
            ids: [],
            entities: {},
          },
          user: {
            entities: {},
          },
        },
      });
    }
  });

  test('dispatches a kiyoshiesFetchFailed and an errorDialogOpened if the fetch failed', async () => {
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.getKiyoshies.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchKiyoshies,
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('kiyoshi/entitiesFetchFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

describe('fetchKiyoshi()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a kiyoshiFetchSucceeded with a fetched kiyoshi', async () => {
    const kiyoshi = kiyoshiSamples[1];
    // @ts-ignore  Property 'mockResolvedValue' does not exist
    apis.getKiyoshi.mockResolvedValue(kiyoshi);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchKiyoshi,
      kiyoshiBeingFetched(kiyoshi.id),
    ).toPromise();

    expect(dispatched.length).toBe(1);
    expect(dispatched[0]).toEqual<ReturnType<typeof kiyoshiFetchSucceeded>>({
      type: 'kiyoshi/entityFetchSucceeded',
      payload: {
        kiyoshi: { entity: { ...kiyoshi, madeBy: kiyoshi.madeBy.id } },
        user: { entity: kiyoshi.madeBy },
      },
    });
  });

  test('dispatches a kiyoshiFetchFailed and an errorDialogOpened if the fetch failed', async () => {
    const kiyoshi = kiyoshiSamples[1];
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.getKiyoshi.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchKiyoshi,
      kiyoshiBeingFetched(kiyoshi.id),
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('kiyoshi/entityFetchFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

describe('createAndPostKiyoshi()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a kiyoshiPostSucceeded', async () => {
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createAndPostKiyoshi,
      kiyoshiBeingAdded(userSamples[0]),
    ).toPromise();

    expect(dispatched.length).toBe(1);
    expect(dispatched[0].type).toBe('kiyoshi/entityPostSucceeded');
  });

  test('dispatches a kiyoshiPostFailed and an errorDialogOpened if the post failed', async () => {
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.postKiyoshi.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createAndPostKiyoshi,
      kiyoshiBeingAdded(userSamples[0]),
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('kiyoshi/entityPostFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

describe('deleteKiyoshies()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a kiyoshiesDeleteSucceeded if the deletion succeeded', async () => {
    const kiyoshi = kiyoshiSamples[0];
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      deleteKiyoshies,
      kiyoshiesBeingDeleted([kiyoshi.id]),
    ).toPromise();

    expect(dispatched.length).toBe(1);
    expect(dispatched[0].type).toBe('kiyoshi/entitiesDeleteSucceeded');
  });

  test('dispatches a kiyoshiesDeleteFailed and an errorDialogOpened if the deletion failed', async () => {
    const kiyoshi = kiyoshiSamples[0];
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.deleteKiyoshies.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      deleteKiyoshies,
      kiyoshiesBeingDeleted([kiyoshi.id]),
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('kiyoshi/entitiesDeleteFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

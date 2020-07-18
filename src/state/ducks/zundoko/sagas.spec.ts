import { runSaga } from 'redux-saga';
import { zundokoSamples } from './models';
import { fetchZundokos, fetchZundoko, createAndPostZundoko, deleteZundokos } from './sagas';
import {
  zundokoBeingFetched,
  zundokosBeingDeleted,
  zundokosFetchSucceeded,
  zundokoFetchSucceeded,
} from './actions';
import * as apis from './apis';

jest.mock('./apis');

describe('fetchZundokos()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a zundokosFetchSucceeded with fetched zundokos', async () => {
    {
      // @ts-ignore  Property 'mockResolvedValue' does not exist
      apis.getZundokos.mockResolvedValue(zundokoSamples);
      const dispatched = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchZundokos,
      ).toPromise();

      expect(dispatched.length).toBe(1);
      expect(dispatched[0]).toEqual<ReturnType<typeof zundokosFetchSucceeded>>({
        type: 'zundoko/entitiesFetchSucceeded',
        payload: {
          zundoko: {
            ids: zundokoSamples.map((zundoko) => zundoko.id),
            entities: zundokoSamples.reduce(
              (zundokos, zundoko) => ({
                ...zundokos,
                [zundoko.id]: zundoko,
              }),
              {},
            ),
          },
        },
      });
    }

    {
      // @ts-ignore  Property 'mockResolvedValue' does not exist
      apis.getZundokos.mockResolvedValue([]);
      const dispatched = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchZundokos,
      ).toPromise();

      expect(dispatched.length).toBe(1);
      expect(dispatched[0]).toEqual<ReturnType<typeof zundokosFetchSucceeded>>({
        type: 'zundoko/entitiesFetchSucceeded',
        payload: {
          zundoko: {
            ids: [],
            entities: {},
          },
        },
      });
    }
  });

  test('dispatches a zundokosFetchFailed and an errorDialogOpened if the fetch failed', async () => {
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.getZundokos.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchZundokos,
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('zundoko/entitiesFetchFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

describe('fetchZundoko()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a zundokoFetchSucceeded with a fetched zundoko', async () => {
    const zundoko = zundokoSamples[1];
    // @ts-ignore  Property 'mockResolvedValue' does not exist
    apis.getZundoko.mockResolvedValue(zundoko);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchZundoko,
      zundokoBeingFetched(zundoko.id),
    ).toPromise();

    expect(dispatched.length).toBe(1);
    expect(dispatched[0]).toEqual<ReturnType<typeof zundokoFetchSucceeded>>({
      type: 'zundoko/entityFetchSucceeded',
      payload: {
        zundoko: { entity: zundoko },
      },
    });
  });

  test('dispatches a zundokoFetchFailed and an errorDialogOpened if the fetch failed', async () => {
    const zundoko = zundokoSamples[1];
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.getZundoko.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchZundoko,
      zundokoBeingFetched(zundoko.id),
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('zundoko/entityFetchFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

describe('createAndPostZundoko()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a zundokoPostSucceeded', async () => {
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createAndPostZundoko,
    ).toPromise();

    expect(dispatched.length).toBe(1);
    expect(dispatched[0].type).toBe('zundoko/entityPostSucceeded');
  });

  test('dispatches a zundokoPostFailed and an errorDialogOpened if the post failed', async () => {
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.postZundoko.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      createAndPostZundoko,
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('zundoko/entityPostFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

describe('deleteZundokos()', () => {
  beforeEach(() => jest.resetAllMocks());

  test('dispatches a zundokosDeleteSucceeded if the deletion succeeded', async () => {
    const zundoko = zundokoSamples[0];
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      deleteZundokos,
      zundokosBeingDeleted([zundoko.id]),
    ).toPromise();

    expect(dispatched.length).toBe(1);
    expect(dispatched[0].type).toBe('zundoko/entitiesDeleteSucceeded');
  });

  test('dispatches a zundokosDeleteFailed and an errorDialogOpened if the deletion failed', async () => {
    const zundoko = zundokoSamples[0];
    const err = new Error('some error');
    // @ts-ignore  Property 'mockRejectedValue' does not exist
    apis.deleteZundokos.mockRejectedValue(err);
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      deleteZundokos,
      zundokosBeingDeleted([zundoko.id]),
    ).toPromise();

    expect(dispatched.length).toBe(2);
    expect(dispatched[0].type).toBe('zundoko/entitiesDeleteFailed');
    expect(dispatched[0].error).toBe(true);
    expect(dispatched[0].payload).toEqual(err);
    expect(dispatched[1].type).toBe('ui/errorDialogOpened');
    expect(dispatched[1].payload.ui.contentText).toBe('Error: some error');
  });
});

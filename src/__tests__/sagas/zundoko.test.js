import MockAdapter from 'axios-mock-adapter';
import { runSaga } from 'redux-saga';
import { fetchZundoko } from '../../sagas/zundoko';
import { client, API_UUID } from '../../services/apis';

const axiosMock = new MockAdapter(client);

describe('sagas', () => {
  describe('fetchZundoko()', () => {
    test('dispatches a ZUNDOKO_FETCH_SUCCEEDED with ズン if API_UUID returns uuid starting with 0', async () => {
      const uuid = '086edb7e-07f9-4581-857e-de8ee92fcaa6';
      axiosMock.onGet(API_UUID).reply(200, {
        uuid,
      });
      const dispatched = [];

      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        fetchZundoko,
      ).toPromise();

      expect(dispatched.length).toBe(1);
      expect(dispatched[0]).toEqual({
        type: 'ZUNDOKO_FETCH_SUCCEEDED',
        payload: {
          zundoko: 'ズン',
        },
      });
    });

    test('dispatches a ZUNDOKO_FETCH_SUCCEEDED with ドコ if API_UUID returns uuid starting with a', async () => {
      const uuid = 'a86edb7e-07f9-4581-857e-de8ee92fcaa6';
      axiosMock.onGet(API_UUID).reply(201, {
        uuid,
      });
      const dispatched = [];

      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        fetchZundoko,
      ).toPromise();

      expect(dispatched.length).toBe(1);
      expect(dispatched[0]).toEqual({
        type: 'ZUNDOKO_FETCH_SUCCEEDED',
        payload: {
          zundoko: 'ドコ',
        },
      });
    });

    test('dispatches a ZUNDOKO_FETCH_FAILED if API_UUID times out', async () => {
      axiosMock.onGet(API_UUID).timeout();
      const dispatched = [];

      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        fetchZundoko,
      ).toPromise();

      expect(dispatched.length).toBe(1);
      expect(dispatched[0].type).toBe('ZUNDOKO_FETCH_FAILED');
      expect(dispatched[0].error).toBe(true);
    });
  });
});

import { all, spawn, call } from 'redux-saga/effects';
import { appReducer as app, AppState } from './app';
import { uiReducer as ui, UIState } from './ui';
import { zundokoReducer as zundoko, zundokoWatcherSagas, ZundokoState } from './zundoko';
import { userReducer as user, userWatcherSagas, UserState } from './user';
import { kiyoshiReducer as kiyoshi, kiyoshiWatcherSagas, KiyoshiState } from './kiyoshi';

/**
 * Returns a noop action.
 *
 * @returns an action.
 */
export const noop = (): Readonly<{ type: 'no/op' }> => ({
  type: 'no/op',
});

/**
 * The type of state in the Redux store.
 */
export type StoreState = Readonly<{
  app: AppState;
  ui: UIState;
  zundoko: ZundokoState;
  user: UserState;
  kiyoshi: KiyoshiState;
}>;

export const reducers = {
  app,
  ui,
  zundoko,
  user,
  kiyoshi,
};

/**
 * The root saga.
 *
 * @see {@link https://redux-saga.js.org/docs/advanced/RootSaga.html}
 */
export function* rootSaga() {
  const watchers = [...zundokoWatcherSagas, ...userWatcherSagas, ...kiyoshiWatcherSagas];

  yield all(
    watchers.map((saga) =>
      // eslint-disable-next-line func-names
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (ex) {
            // eslint-disable-next-line no-console
            console.exception(ex);
          }
        }
      }),
    ),
  );
}

/** Sagas called by watcher sagas. */

import { call, put, SagaReturnType } from 'redux-saga/effects';
import {
  zundokosFetchSucceeded,
  zundokosFetchFailed,
  zundokoBeingFetched,
  zundokoFetchSucceeded,
  zundokoFetchFailed,
  zundokoPostSucceeded,
  zundokoPostFailed,
  zundokosBeingDeleted,
  zundokosDeleteSucceeded,
  zundokosDeleteFailed,
} from './actions';
import { errorDialogOpened } from '~/state/ducks/ui/actions';
import * as apis from './apis';
import { Zundoko, normalizeZundokos, zundokoNormalizrSchemaKey } from './models';

/**
 * A saga that fetches zundokos.
 */
export function* fetchZundokos() {
  try {
    const zundokos: SagaReturnType<typeof apis.getZundokos> = yield call(apis.getZundokos);
    const normalized = normalizeZundokos(zundokos);
    if (normalized.result.length !== 0) {
      yield put(
        zundokosFetchSucceeded(normalized.result, normalized.entities[zundokoNormalizrSchemaKey]),
      );
    } else {
      yield put(zundokosFetchSucceeded([], {}));
    }
  } catch (ex) {
    yield put(zundokosFetchFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

/**
 * A saga that fetches a zundoko.
 *
 * @param action - A zundokoBeingFetched action.
 */
export function* fetchZundoko(action: ReturnType<typeof zundokoBeingFetched>) {
  try {
    const zundoko: SagaReturnType<typeof apis.getZundoko> = yield call(
      apis.getZundoko,
      action.payload.zundoko.id,
    );
    yield put(zundokoFetchSucceeded(zundoko));
  } catch (ex) {
    yield put(zundokoFetchFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

function generateUuid() {
  const chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
  return chars
    .map((ch) => {
      switch (ch) {
        case 'x':
          return Math.floor(Math.random() * 16).toString(16);
        case 'y':
          return (Math.floor(Math.random() * 4) + 8).toString(16);
        default:
          return ch;
      }
    })
    .join('');
}

/**
 * A saga that creates and posts a zundoko.
 */
export function* createAndPostZundoko() {
  const uuid = generateUuid();
  const word = uuid.match(/^[0-9]/) ? 'Zun' : 'Doko';
  const newZd: Zundoko = {
    id: uuid,
    saidAt: new Date().toISOString(),
    word,
  };
  try {
    yield call(apis.postZundoko, newZd);
    yield put(zundokoPostSucceeded(word));
  } catch (ex) {
    yield put(zundokoPostFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

/**
 * A saga that deletes zundokos.
 *
 * @param action - A zundokosBeingDeleted action.
 */
export function* deleteZundokos(action: ReturnType<typeof zundokosBeingDeleted>) {
  try {
    yield call(apis.deleteZundokos, action.payload.zundoko.ids);
    yield put(zundokosDeleteSucceeded());
  } catch (ex) {
    yield put(zundokosDeleteFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

/** Sagas called by watcher sagas. */

import { call, put, SagaReturnType } from 'redux-saga/effects';
import {
  kiyoshiesFetchSucceeded,
  kiyoshiesFetchFailed,
  kiyoshiBeingFetched,
  kiyoshiFetchSucceeded,
  kiyoshiFetchFailed,
  kiyoshiPostSucceeded,
  kiyoshiPostFailed,
  kiyoshiesBeingDeleted,
  kiyoshiesDeleteSucceeded,
  kiyoshiesDeleteFailed,
  kiyoshiBeingAdded,
} from './actions';
import { errorDialogOpened } from '~/state/ducks/ui/actions';
import * as apis from './apis';
import { Kiyoshi, normalizeKiyoshies, kiyoshiNormalizrSchemaKey } from './models';
import { userNormalizrSchemaKey } from '~/state/ducks/user/models';

/**
 * A saga that fetches kiyoshies.
 */
export function* fetchKiyoshies() {
  try {
    const kiyoshies: SagaReturnType<typeof apis.getKiyoshies> = yield call(apis.getKiyoshies);
    const normalized = normalizeKiyoshies(kiyoshies);
    if (normalized.result.length !== 0) {
      yield put(
        kiyoshiesFetchSucceeded(
          normalized.result,
          normalized.entities[kiyoshiNormalizrSchemaKey],
          normalized.entities[userNormalizrSchemaKey],
        ),
      );
    } else {
      yield put(kiyoshiesFetchSucceeded([], {}, {}));
    }
  } catch (ex) {
    yield put(kiyoshiesFetchFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

/**
 * A saga that fetches a kiyoshi.
 */
export function* fetchKiyoshi(action: ReturnType<typeof kiyoshiBeingFetched>) {
  try {
    const kiyoshi: SagaReturnType<typeof apis.getKiyoshi> = yield call(
      apis.getKiyoshi,
      action.payload.kiyoshi.id,
    );
    const normalized = normalizeKiyoshies([kiyoshi]);
    const normalizedKiyoshi = Object.values(normalized.entities[kiyoshiNormalizrSchemaKey]).pop()!;
    const user = Object.values(normalized.entities[userNormalizrSchemaKey]).pop()!;
    yield put(kiyoshiFetchSucceeded(normalizedKiyoshi, user));
  } catch (ex) {
    yield put(kiyoshiFetchFailed(ex));
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
 * A saga that creates and posts a kiyoshi.
 *
 * @param action - A kiyoshiBeingAdded action.
 */
export function* createAndPostKiyoshi(action: ReturnType<typeof kiyoshiBeingAdded>) {
  const uuid = generateUuid();
  const newKiyoshi: Kiyoshi = {
    id: uuid,
    saidAt: new Date().toISOString(),
    madeBy: action.payload.kiyoshi.user,
  };
  try {
    yield call(apis.postKiyoshi, newKiyoshi);
    yield put(kiyoshiPostSucceeded());
  } catch (ex) {
    yield put(kiyoshiPostFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

/**
 * A saga that deletes kiyoshies.
 *
 * @param action - A kiyoshiesBeingDeleted action.
 */
export function* deleteKiyoshies(action: ReturnType<typeof kiyoshiesBeingDeleted>) {
  try {
    yield call(apis.deleteKiyoshies, action.payload.kiyoshi.ids);
    yield put(kiyoshiesDeleteSucceeded());
  } catch (ex) {
    yield put(kiyoshiesDeleteFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

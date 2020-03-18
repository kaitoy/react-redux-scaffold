/** Sagas called by watcher sagas. */

import { call, put, SagaReturnType } from 'redux-saga/effects';
import {
  usersFetchSucceeded,
  usersFetchFailed,
  userBeingFetched,
  userFetchSucceeded,
  userFetchFailed,
  userBeingPosted,
  userPostSucceeded,
  userPostFailed,
  usersBeingDeleted,
  usersDeleteSucceeded,
  usersDeleteFailed,
} from './actions';
import { errorDialogOpened } from '~/state/ducks/ui/actions';
import * as apis from './apis';

/**
 * A saga that fetches users.
 */
export function* fetchUsers() {
  try {
    const users: SagaReturnType<typeof apis.getUsers> = yield call(apis.getUsers);
    yield put(usersFetchSucceeded(users));
  } catch (ex) {
    yield put(usersFetchFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

/**
 * A saga that fetches a user.
 *
 * @param action - A userBeingFetched action.
 */
export function* fetchUser(action: ReturnType<typeof userBeingFetched>) {
  try {
    const user: SagaReturnType<typeof apis.getUser> = yield call(
      apis.getUser,
      action.payload.user.id,
    );
    yield put(userFetchSucceeded(user));
  } catch (ex) {
    yield put(userFetchFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

/**
 * A saga that posts a user.
 *
 * @param action - A userBeingPosted action.
 */
export function* postUser(action: ReturnType<typeof userBeingPosted>) {
  try {
    yield call(apis.postUser, action.payload.user.entity);
    yield put(userPostSucceeded());
  } catch (ex) {
    yield put(userPostFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

/**
 * A saga that deletes users.
 *
 * @param action - A usersBeingDeleted action.
 */
export function* deleteUsers(action: ReturnType<typeof usersBeingDeleted>) {
  try {
    yield call(apis.deleteUsers, action.payload.user.ids);
    yield put(usersDeleteSucceeded());
  } catch (ex) {
    yield put(usersDeleteFailed(ex));
    yield put(errorDialogOpened(ex.toString()));
  }
}

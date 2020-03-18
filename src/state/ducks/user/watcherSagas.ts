/** Sagas passed to the saga middleware. */

import { takeLeading } from 'redux-saga/effects';
import { usersBeingFetched, userBeingFetched, userBeingPosted, usersBeingDeleted } from './actions';
import { fetchUsers, fetchUser, postUser, deleteUsers } from './sagas';

/**
 * A saga that watches usersBeingFetched actions and calls {@link fetchUsers} for each one.
 */
export function* watchUsersBeingFetched() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof usersBeingFetched>, 'type'>) =>
      type === 'user/entitiesBeingFetched',
    fetchUsers,
  );
}

/**
 * A saga that watches userBeingFetched actions and calls {@link fetchUser} for each one.
 */
export function* watchUserBeingFetched() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof userBeingFetched>, 'type'>) =>
      type === 'user/entityBeingFetched',
    fetchUser,
  );
}

/**
 * A saga that watches userBeingPosted actions and calls {@link postUser} for each one.
 */
export function* watchUserBeingPosted() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof userBeingPosted>, 'type'>) =>
      type === 'user/entityBeingPosted',
    postUser,
  );
}

/**
 * A saga that watches userBeingDeleted actions and calls {@link deleteUsers} for each one.
 */
export function* watchUsersBeingDeleted() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof usersBeingDeleted>, 'type'>) =>
      type === 'user/entitiesBeingDeleted',
    deleteUsers,
  );
}

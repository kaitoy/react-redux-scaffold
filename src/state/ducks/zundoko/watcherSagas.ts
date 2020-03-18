/** Sagas passed to the saga middleware. */

import { takeLeading } from 'redux-saga/effects';
import {
  zundokosBeingFetched,
  zundokoBeingFetched,
  zundokoBeingAdded,
  zundokosBeingDeleted,
} from './actions';
import { fetchZundokos, fetchZundoko, createAndPostZundoko, deleteZundokos } from './sagas';

/**
 * A saga that watches zundokosBeingFetched actions and calls {@link fetchZundokos} for each one.
 */
export function* watchZundokosBeingFetched() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof zundokosBeingFetched>, 'type'>) =>
      type === 'zundoko/entitiesBeingFetched',
    fetchZundokos,
  );
}

/**
 * A saga that watches zundokoBeingFetched actions and calls {@link fetchZundoko} for each one.
 */
export function* watchZundokoBeingFetched() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof zundokoBeingFetched>, 'type'>) =>
      type === 'zundoko/entityBeingFetched',
    fetchZundoko,
  );
}

/**
 * A saga that watches zundokoBeingAdded actions and calls {@link createAndPostZundoko} for each one.
 */
export function* watchZundokoBeingAdded() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof zundokoBeingAdded>, 'type'>) =>
      type === 'zundoko/entityBeingAdded',
    createAndPostZundoko,
  );
}

/**
 * A saga that watches zundokoBeingDeleted actions and calls {@link deleteZundokos} for each one.
 */
export function* watchZundokosBeingDeleted() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof zundokosBeingDeleted>, 'type'>) =>
      type === 'zundoko/entitiesBeingDeleted',
    deleteZundokos,
  );
}

/** Sagas passed to the saga middleware. */

import { takeLeading } from 'redux-saga/effects';
import {
  kiyoshiesBeingFetched,
  kiyoshiBeingFetched,
  kiyoshiBeingAdded,
  kiyoshiesBeingDeleted,
} from './actions';
import { fetchKiyoshies, fetchKiyoshi, createAndPostKiyoshi, deleteKiyoshies } from './sagas';

/**
 * A saga that watches kiyoshiesBeingFetched actions and calls {@link fetchKiyoshies} for each one.
 */
export function* watchKiyoshiesBeingFetched() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof kiyoshiesBeingFetched>, 'type'>) =>
      type === 'kiyoshi/entitiesBeingFetched',
    fetchKiyoshies,
  );
}

/**
 * A saga that watches kiyoshiBeingFetched actions and calls {@link fetchKiyoshi} for each one.
 */
export function* watchKiyoshiBeingFetched() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof kiyoshiBeingFetched>, 'type'>) =>
      type === 'kiyoshi/entityBeingFetched',
    fetchKiyoshi,
  );
}

/**
 * A saga that watches kiyoshiBeingAdded actions and calls {@link createAndPostKiyoshi} for each one.
 */
export function* watchKiyoshiBeingAdded() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof kiyoshiBeingAdded>, 'type'>) =>
      type === 'kiyoshi/entityBeingAdded',
    createAndPostKiyoshi,
  );
}

/**
 * A saga that watches kiyoshiBeingDeleted actions and calls {@link deleteKiyoshies} for each one.
 */
export function* watchKiyoshiesBeingDeleted() {
  yield takeLeading(
    ({ type }: Pick<ReturnType<typeof kiyoshiesBeingDeleted>, 'type'>) =>
      type === 'kiyoshi/entitiesBeingDeleted',
    deleteKiyoshies,
  );
}

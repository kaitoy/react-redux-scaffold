import { NormalizedKiyoshi, NormalizedKiyoshies } from './models';
import { User, NormalizedUsers } from '~/state/ducks/user/models';

/**
 * Returns an action indicating kiyoshi data is not ready
 *
 * @returns an action.
 */
export const kiyoshiDataNotReady = (): Readonly<{ type: 'kiyoshi/dataNotReady' }> => ({
  type: 'kiyoshi/dataNotReady',
});

/**
 * Returns an action indicating kiyoshies are being fetched.
 *
 * @returns an action.
 */
export const kiyoshiesBeingFetched = (): Readonly<{ type: 'kiyoshi/entitiesBeingFetched' }> => ({
  type: 'kiyoshi/entitiesBeingFetched',
});

/**
 * Returns an action indicating fetching kiyoshies succeeded.
 *
 * @param ids - IDs of fetched kiyoshies.
 * @param kiyoshies - fetched kiyoshies.
 * @param users - Users of fetched kiyoshies.
 * @returns an action.
 */
export const kiyoshiesFetchSucceeded = (
  ids: NormalizedKiyoshi['id'][],
  kiyoshies: NormalizedKiyoshies,
  users: NormalizedUsers,
): Readonly<{
  type: 'kiyoshi/entitiesFetchSucceeded';
  payload: {
    kiyoshi: { ids: NormalizedKiyoshi['id'][]; entities: NormalizedKiyoshies };
    user: { entities: NormalizedUsers };
  };
}> => ({
  type: 'kiyoshi/entitiesFetchSucceeded',
  payload: {
    kiyoshi: { ids, entities: kiyoshies },
    user: { entities: users },
  },
});

/**
 * Returns an action indicating fetching kiyoshies failed.
 *
 * @returns an action.
 */
export const kiyoshiesFetchFailed = (
  err: Object,
): Readonly<{
  type: 'kiyoshi/entitiesFetchFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'kiyoshi/entitiesFetchFailed',
  error: true,
  payload: err,
});

/**
 * Returns an action indicating a kiyoshi is being fetched.
 *
 * @param id - An ID of a kiyoshi to fetch.
 * @returns an action.
 */
export const kiyoshiBeingFetched = (
  id: string,
): Readonly<{ type: 'kiyoshi/entityBeingFetched'; payload: { kiyoshi: { id: string } } }> => ({
  type: 'kiyoshi/entityBeingFetched',
  payload: {
    kiyoshi: { id },
  },
});

/**
 * Returns an action indicating fetching a kiyoshi succeeded.
 *
 * @param kiyoshi - A fetched kiyoshi.
 * @param user - A user of the fetched kiyoshi.
 * @returns an action.
 */
export const kiyoshiFetchSucceeded = (
  kiyoshi: NormalizedKiyoshi,
  user: User,
): Readonly<{
  type: 'kiyoshi/entityFetchSucceeded';
  payload: { kiyoshi: { entity: NormalizedKiyoshi }; user: { entity: User } };
}> => ({
  type: 'kiyoshi/entityFetchSucceeded',
  payload: {
    kiyoshi: { entity: kiyoshi },
    user: { entity: user },
  },
});

/**
 * Returns an action indicating fetching a kiyoshi failed.
 *
 * @returns an action.
 */
export const kiyoshiFetchFailed = (
  err: Object,
): Readonly<{
  type: 'kiyoshi/entityFetchFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'kiyoshi/entityFetchFailed',
  error: true,
  payload: err,
});

/**
 * Returns an action indicating a kiyoshi is being added.
 *
 * @param user - A user ID for which a kiyoshi is being added.
 * @returns an action.
 */
export const kiyoshiBeingAdded = (
  user: User,
): Readonly<{ type: 'kiyoshi/entityBeingAdded'; payload: { kiyoshi: { user: User } } }> => ({
  type: 'kiyoshi/entityBeingAdded',
  payload: {
    kiyoshi: {
      user,
    },
  },
});

/**
 * Returns an action indicating posting a kiyoshi succeeded.
 *
 * @returns an action.
 */
export const kiyoshiPostSucceeded = (): Readonly<{
  type: 'kiyoshi/entityPostSucceeded';
}> => ({ type: 'kiyoshi/entityPostSucceeded' });

/**
 * Returns an action indicating posting a kiyoshi failed.
 *
 * @returns an action.
 */
export const kiyoshiPostFailed = (
  err: Object,
): Readonly<{
  type: 'kiyoshi/entityPostFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'kiyoshi/entityPostFailed',
  error: true,
  payload: err,
});

/**
 * Returns an action indicating specified kiyoshies are being deleted.
 *
 * @param ids - IDs of kiyoshies to delete.
 * @returns an action.
 */
export const kiyoshiesBeingDeleted = (
  ids: string[],
): Readonly<{
  type: 'kiyoshi/entitiesBeingDeleted';
  payload: { kiyoshi: { ids: string[] } };
}> => ({
  type: 'kiyoshi/entitiesBeingDeleted',
  payload: {
    kiyoshi: { ids },
  },
});

/**
 * Returns an action indicating deleting kiyoshies succeeded.
 *
 * @returns an action.
 */
export const kiyoshiesDeleteSucceeded = (): Readonly<{
  type: 'kiyoshi/entitiesDeleteSucceeded';
}> => ({ type: 'kiyoshi/entitiesDeleteSucceeded' });

/**
 * Returns an action indicating posting kiyoshi failed.
 *
 * @returns an action.
 */
export const kiyoshiesDeleteFailed = (
  err: Object,
): Readonly<{
  type: 'kiyoshi/entitiesDeleteFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'kiyoshi/entitiesDeleteFailed',
  error: true,
  payload: err,
});

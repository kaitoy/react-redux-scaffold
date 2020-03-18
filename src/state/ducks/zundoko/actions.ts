import { Zundoko } from './models';

/**
 * Returns an action indicating zundoko data is not ready
 *
 * @returns an action.
 */
export const zundokoDataNotReady = (): Readonly<{ type: 'zundoko/dataNotReady' }> => ({
  type: 'zundoko/dataNotReady',
});

/**
 * Returns an action indicating zundokos are being fetched.
 *
 * @returns an action.
 */
export const zundokosBeingFetched = (): Readonly<{ type: 'zundoko/entitiesBeingFetched' }> => ({
  type: 'zundoko/entitiesBeingFetched',
});

/**
 * Returns an action indicating fetching zundokos succeeded.
 *
 * @param zundokos - fetched zundokos.
 * @returns an action.
 */
export const zundokosFetchSucceeded = (
  zundokos: Zundoko[],
): Readonly<{
  type: 'zundoko/entitiesFetchSucceeded';
  payload: { zundoko: { entities: Zundoko[] } };
}> => ({
  type: 'zundoko/entitiesFetchSucceeded',
  payload: {
    zundoko: { entities: zundokos },
  },
});

/**
 * Returns an action indicating fetching zundokos failed.
 *
 * @returns an action.
 */
export const zundokosFetchFailed = (
  err: Object,
): Readonly<{
  type: 'zundoko/entitiesFetchFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'zundoko/entitiesFetchFailed',
  error: true,
  payload: err,
});

/**
 * Returns an action indicating a zundoko is being fetched.
 *
 * @param id - An ID of a zundoko to fetch.
 * @returns an action.
 */
export const zundokoBeingFetched = (
  id: string,
): Readonly<{ type: 'zundoko/entityBeingFetched'; payload: { zundoko: { id: string } } }> => ({
  type: 'zundoko/entityBeingFetched',
  payload: {
    zundoko: { id },
  },
});

/**
 * Returns an action indicating fetching a zundoko succeeded.
 *
 * @param zundoko - A fetched zundoko.
 * @returns an action.
 */
export const zundokoFetchSucceeded = (
  zundoko: Zundoko,
): Readonly<{
  type: 'zundoko/entityFetchSucceeded';
  payload: { zundoko: { entity: Zundoko } };
}> => ({
  type: 'zundoko/entityFetchSucceeded',
  payload: {
    zundoko: { entity: zundoko },
  },
});

/**
 * Returns an action indicating fetching a zundoko failed.
 *
 * @returns an action.
 */
export const zundokoFetchFailed = (
  err: Object,
): Readonly<{
  type: 'zundoko/entityFetchFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'zundoko/entityFetchFailed',
  error: true,
  payload: err,
});

/**
 * Returns an action indicating a zundoko is being added.
 *
 * @returns an action.
 */
export const zundokoBeingAdded = (): Readonly<{ type: 'zundoko/entityBeingAdded' }> => ({
  type: 'zundoko/entityBeingAdded',
});

/**
 * Returns an action indicating posting a zundoko succeeded.
 *
 * @returns an action.
 */
export const zundokoPostSucceeded = (
  word: Zundoko['word'],
): Readonly<{
  type: 'zundoko/entityPostSucceeded';
  payload: {
    zundoko: {
      word: Zundoko['word'];
    };
  };
}> => ({
  type: 'zundoko/entityPostSucceeded',
  payload: {
    zundoko: {
      word,
    },
  },
});

/**
 * Returns an action indicating posting a zundoko failed.
 *
 * @returns an action.
 */
export const zundokoPostFailed = (
  err: Object,
): Readonly<{
  type: 'zundoko/entityPostFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'zundoko/entityPostFailed',
  error: true,
  payload: err,
});

/**
 * Returns an action indicating specified zundokos are being deleted.
 *
 * @param ids - IDs of zundokos to delete.
 * @returns an action.
 */
export const zundokosBeingDeleted = (
  ids: string[],
): Readonly<{
  type: 'zundoko/entitiesBeingDeleted';
  payload: { zundoko: { ids: string[] } };
}> => ({
  type: 'zundoko/entitiesBeingDeleted',
  payload: {
    zundoko: { ids },
  },
});

/**
 * Returns an action indicating deleting zundokos succeeded.
 *
 * @returns an action.
 */
export const zundokosDeleteSucceeded = (): Readonly<{
  type: 'zundoko/entitiesDeleteSucceeded';
}> => ({ type: 'zundoko/entitiesDeleteSucceeded' });

/**
 * Returns an action indicating posting zundoko failed.
 *
 * @returns an action.
 */
export const zundokosDeleteFailed = (
  err: Object,
): Readonly<{
  type: 'zundoko/entitiesDeleteFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'zundoko/entitiesDeleteFailed',
  error: true,
  payload: err,
});

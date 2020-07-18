import { User, NormalizedUser, NormalizedUsers } from './models';

/**
 * Returns an action indicating user data is not ready
 *
 * @returns an action.
 */
export const userDataNotReady = (): Readonly<{ type: 'user/dataNotReady' }> => ({
  type: 'user/dataNotReady',
});

/**
 * Returns an action indicating users are being fetched.
 *
 * @returns an action.
 */
export const usersBeingFetched = (): Readonly<{ type: 'user/entitiesBeingFetched' }> => ({
  type: 'user/entitiesBeingFetched',
});

/**
 * Returns an action indicating fetching users succeeded.
 *
 * @param ids - IDs of fetched users.
 * @param users - fetched users.
 * @returns an action.
 */
export const usersFetchSucceeded = (
  ids: NormalizedUser['id'][],
  users: NormalizedUsers,
): Readonly<{
  type: 'user/entitiesFetchSucceeded';
  payload: { user: { ids: NormalizedUser['id'][]; entities: NormalizedUsers } };
}> => ({
  type: 'user/entitiesFetchSucceeded',
  payload: {
    user: { ids, entities: users },
  },
});

/**
 * Returns an action indicating fetching users failed.
 *
 * @returns an action.
 */
export const usersFetchFailed = (
  err: Object,
): Readonly<{
  type: 'user/entitiesFetchFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'user/entitiesFetchFailed',
  error: true,
  payload: err,
});

/**
 * Returns an action indicating a user is being fetched.
 *
 * @param id - An ID of a user to fetch.
 * @returns an action.
 */
export const userBeingFetched = (
  id: string,
): Readonly<{ type: 'user/entityBeingFetched'; payload: { user: { id: string } } }> => ({
  type: 'user/entityBeingFetched',
  payload: {
    user: { id },
  },
});

/**
 * Returns an action indicating fetching a user succeeded.
 *
 * @param user - A fetched user.
 * @returns an action.
 */
export const userFetchSucceeded = (
  user: NormalizedUser,
): Readonly<{
  type: 'user/entityFetchSucceeded';
  payload: { user: { entity: NormalizedUser } };
}> => ({
  type: 'user/entityFetchSucceeded',
  payload: {
    user: { entity: user },
  },
});

/**
 * Returns an action indicating fetching a user failed.
 *
 * @returns an action.
 */
export const userFetchFailed = (
  err: Object,
): Readonly<{
  type: 'user/entityFetchFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'user/entityFetchFailed',
  error: true,
  payload: err,
});

/**
 * Returns an action indicating a user is being added.
 *
 * @returns an action.
 */
export const userBeingPosted = (
  user: User,
): Readonly<{
  type: 'user/entityBeingPosted';
  payload: { user: { entity: User } };
}> => ({
  type: 'user/entityBeingPosted',
  payload: {
    user: { entity: user },
  },
});

/**
 * Returns an action indicating posting a user succeeded.
 *
 * @returns an action.
 */
export const userPostSucceeded = (): Readonly<{
  type: 'user/entityPostSucceeded';
}> => ({ type: 'user/entityPostSucceeded' });

/**
 * Returns an action indicating posting a user failed.
 *
 * @returns an action.
 */
export const userPostFailed = (
  err: Object,
): Readonly<{
  type: 'user/entityPostFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'user/entityPostFailed',
  error: true,
  payload: err,
});

/**
 * Returns an action indicating specified users are being deleted.
 *
 * @param ids - IDs of users to delete.
 * @returns an action.
 */
export const usersBeingDeleted = (
  ids: string[],
): Readonly<{
  type: 'user/entitiesBeingDeleted';
  payload: { user: { ids: string[] } };
}> => ({
  type: 'user/entitiesBeingDeleted',
  payload: {
    user: { ids },
  },
});

/**
 * Returns an action indicating deleting users succeeded.
 *
 * @returns an action.
 */
export const usersDeleteSucceeded = (): Readonly<{
  type: 'user/entitiesDeleteSucceeded';
}> => ({ type: 'user/entitiesDeleteSucceeded' });

/**
 * Returns an action indicating posting user failed.
 *
 * @returns an action.
 */
export const usersDeleteFailed = (
  err: Object,
): Readonly<{
  type: 'user/entitiesDeleteFailed';
  error: true;
  payload: Object;
}> => ({
  type: 'user/entitiesDeleteFailed',
  error: true,
  payload: err,
});

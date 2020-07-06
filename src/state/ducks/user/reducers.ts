import produce, { Draft } from 'immer';
import {
  userDataNotReady,
  usersBeingFetched,
  usersFetchSucceeded,
  userBeingFetched,
  userFetchSucceeded,
  userBeingPosted,
  userPostSucceeded,
  userPostFailed,
  usersBeingDeleted,
  usersDeleteSucceeded,
  usersDeleteFailed,
} from './actions';
import { kiyoshiesFetchSucceeded, kiyoshiFetchSucceeded } from '~/state/ducks/kiyoshi/actions';
import { User, NormalizedUsers, normalizeUsers, userNormalizrSchemaKey } from './models';

/**
 * The type of User state in the Redux store.
 */
export type UserState = Readonly<{
  /** True if data is already fetched, false otherwise. */
  dataReady: boolean;

  /** True if some entities are being deleted; false otherwise. */
  dataBeingDeleted: boolean;

  /** True if some entities are being posted; false otherwise. */
  dataBeingPosted: boolean;

  /** Fetched data. */
  data: {
    ids: User['id'][];
    entities: NormalizedUsers;
  };
}>;

const initialState: UserState = {
  dataReady: false,
  dataBeingPosted: false,
  dataBeingDeleted: false,
  data: { ids: [], entities: {} },
};

/**
 * The Redux reducer for the User state.
 *
 * @param state - The current User state.
 * @param action - An action on the state.
 * @returns a new state.
 */
// eslint-disable-next-line import/prefer-default-export
export const userReducer = produce(
  (
    draft: Draft<UserState>,
    action:
      | ReturnType<typeof userDataNotReady>
      | ReturnType<typeof usersBeingFetched>
      | ReturnType<typeof usersFetchSucceeded>
      | ReturnType<typeof userBeingFetched>
      | ReturnType<typeof userFetchSucceeded>
      | ReturnType<typeof userBeingPosted>
      | ReturnType<typeof userPostSucceeded>
      | ReturnType<typeof userPostFailed>
      | ReturnType<typeof usersBeingDeleted>
      | ReturnType<typeof usersDeleteSucceeded>
      | ReturnType<typeof usersDeleteFailed>
      | ReturnType<typeof kiyoshiesFetchSucceeded>
      | ReturnType<typeof kiyoshiFetchSucceeded>,
  ) => {
    switch (action.type) {
      case 'user/dataNotReady':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'user/entitiesBeingFetched':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'user/entitiesFetchSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = true;
        // eslint-disable-next-line no-case-declarations
        const normalizedUsers = normalizeUsers(action.payload.user.entities);
        // eslint-disable-next-line no-param-reassign
        draft.data.ids = normalizedUsers.result;
        // eslint-disable-next-line no-param-reassign
        draft.data.entities = normalizedUsers.entities[userNormalizrSchemaKey];
        break;
      case 'user/entityBeingFetched':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'user/entityFetchSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = true;

        if (!draft.data.entities[action.payload.user.entity.id]) {
          draft.data.ids.push(action.payload.user.entity.id);
        }
        // eslint-disable-next-line no-param-reassign
        draft.data.entities[action.payload.user.entity.id] = action.payload.user.entity;
        break;
      case 'user/entityBeingPosted':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingPosted = true;
        break;
      case 'user/entityPostSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingPosted = false;
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'user/entityPostFailed':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingPosted = false;
        break;
      case 'user/entitiesBeingDeleted':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingDeleted = true;
        break;
      case 'user/entitiesDeleteSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingDeleted = false;
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'user/entitiesDeleteFailed':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingDeleted = false;
        break;
      case 'kiyoshi/entitiesFetchSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = true;

        Object.values(action.payload.user.entities).forEach((user) => {
          if (!draft.data.entities[user.id]) {
            draft.data.ids.push(user.id);
          }
          // eslint-disable-next-line no-param-reassign
          draft.data.entities[user.id] = user;
        });
        break;
      case 'kiyoshi/entityFetchSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = true;

        if (!draft.data.entities[action.payload.user.entity.id]) {
          draft.data.ids.push(action.payload.user.entity.id);
        }
        // eslint-disable-next-line no-param-reassign
        draft.data.entities[action.payload.user.entity.id] = action.payload.user.entity;
        break;
      default:
        // eslint-disable-next-line no-case-declarations
        const _: never = action; // ensure that a case clause exists for every expected action.
        Object.isFrozen(_); // pretend to use _ to make tsc happier.
    }
  },
  initialState,
);

import produce, { Draft } from 'immer';
import {
  kiyoshiDataNotReady,
  kiyoshiesBeingFetched,
  kiyoshiesFetchSucceeded,
  kiyoshiBeingFetched,
  kiyoshiFetchSucceeded,
  kiyoshiBeingAdded,
  kiyoshiPostSucceeded,
  kiyoshiPostFailed,
  kiyoshiesBeingDeleted,
  kiyoshiesDeleteSucceeded,
  kiyoshiesDeleteFailed,
} from './actions';
import { KiyoshiState } from './index';

const initialState: KiyoshiState = {
  dataReady: false,
  dataBeingPosted: false,
  dataBeingDeleted: false,
  data: { ids: [], entities: {} },
};

/**
 * The Redux reducer for the Kiyoshi state.
 *
 * @param state - The current Kiyoshi state.
 * @param action - An action on the state.
 * @returns a new state.
 */
// eslint-disable-next-line import/prefer-default-export
export const kiyoshiReducer = produce(
  (
    draft: Draft<KiyoshiState>,
    action:
      | ReturnType<typeof kiyoshiDataNotReady>
      | ReturnType<typeof kiyoshiesBeingFetched>
      | ReturnType<typeof kiyoshiesFetchSucceeded>
      | ReturnType<typeof kiyoshiBeingFetched>
      | ReturnType<typeof kiyoshiFetchSucceeded>
      | ReturnType<typeof kiyoshiBeingAdded>
      | ReturnType<typeof kiyoshiPostSucceeded>
      | ReturnType<typeof kiyoshiPostFailed>
      | ReturnType<typeof kiyoshiesBeingDeleted>
      | ReturnType<typeof kiyoshiesDeleteSucceeded>
      | ReturnType<typeof kiyoshiesDeleteFailed>,
  ) => {
    switch (action.type) {
      case 'kiyoshi/dataNotReady':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'kiyoshi/entitiesBeingFetched':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'kiyoshi/entitiesFetchSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = true;
        // eslint-disable-next-line no-param-reassign
        draft.data.ids = action.payload.kiyoshi.ids;
        // eslint-disable-next-line no-param-reassign
        draft.data.entities = action.payload.kiyoshi.entities;
        break;
      case 'kiyoshi/entityBeingFetched':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'kiyoshi/entityFetchSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = true;

        if (!draft.data.entities[action.payload.kiyoshi.entity.id]) {
          draft.data.ids.push(action.payload.kiyoshi.entity.id);
        }
        // eslint-disable-next-line no-param-reassign
        draft.data.entities[action.payload.kiyoshi.entity.id] = action.payload.kiyoshi.entity;
        break;
      case 'kiyoshi/entityBeingAdded':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingPosted = true;
        break;
      case 'kiyoshi/entityPostSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingPosted = false;
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'kiyoshi/entityPostFailed':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingPosted = false;
        break;
      case 'kiyoshi/entitiesBeingDeleted':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingDeleted = true;
        break;
      case 'kiyoshi/entitiesDeleteSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingDeleted = false;
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'kiyoshi/entitiesDeleteFailed':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingDeleted = false;
        break;
      default:
        // eslint-disable-next-line no-case-declarations
        const _: never = action; // ensure that a case clause exists for every expected action.
        Object.isFrozen(_); // pretend to use _ to make tsc happier.
    }
  },
  initialState,
);

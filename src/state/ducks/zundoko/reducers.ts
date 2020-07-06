import produce, { Draft } from 'immer';
import {
  zundokoDataNotReady,
  zundokosBeingFetched,
  zundokosFetchSucceeded,
  zundokoBeingFetched,
  zundokoFetchSucceeded,
  zundokoBeingAdded,
  zundokoPostSucceeded,
  zundokoPostFailed,
  zundokosBeingDeleted,
  zundokosDeleteSucceeded,
  zundokosDeleteFailed,
} from './actions';
import { kiyoshiBeingAdded } from '~/state/ducks/kiyoshi/actions';
import {
  Zundoko,
  NormalizedZundokos,
  normalizeZundokos,
  zundokoNormalizrSchemaKey,
} from './models';

/**
 * The type of Zundoko state in the Redux store.
 */
export type ZundokoState = Readonly<{
  /** True if data already fetched, false otherwise. */
  dataReady: boolean;

  /** True if some entities are being deleted; false otherwise. */
  dataBeingDeleted: boolean;

  /** True if some entities are being posted; false otherwise. */
  dataBeingPosted: boolean;

  /** Fetched data. */
  data: {
    ids: Zundoko['id'][];
    entities: NormalizedZundokos;
  };

  /** Set to true if the zundokos pattern meets the Kiyoshi condition. */
  gotToKiyoshi: boolean;
}>;

const initialState: ZundokoState = {
  dataReady: false,
  dataBeingPosted: false,
  dataBeingDeleted: false,
  data: { ids: [], entities: {} },
  gotToKiyoshi: false,
};

let zunCount = 0;

/**
 * Setter of zunCount.
 * This function is exported only for testing purpose.
 *
 * @param count - A new zunCount.
 */
export const setZunCount = (count: number) => {
  zunCount = count;
};

/**
 * The Redux reducer for the Zundoko state.
 *
 * @param state - The current Zundoko state.
 * @param action - An action on the state.
 * @returns a new state.
 */
export const zundokoReducer = produce(
  (
    draft: Draft<ZundokoState>,
    action:
      | ReturnType<typeof zundokoDataNotReady>
      | ReturnType<typeof zundokosBeingFetched>
      | ReturnType<typeof zundokosFetchSucceeded>
      | ReturnType<typeof zundokoBeingFetched>
      | ReturnType<typeof zundokoFetchSucceeded>
      | ReturnType<typeof zundokoBeingAdded>
      | ReturnType<typeof zundokoPostSucceeded>
      | ReturnType<typeof zundokoPostFailed>
      | ReturnType<typeof zundokosBeingDeleted>
      | ReturnType<typeof zundokosDeleteSucceeded>
      | ReturnType<typeof zundokosDeleteFailed>
      | ReturnType<typeof kiyoshiBeingAdded>,
  ) => {
    switch (action.type) {
      case 'zundoko/dataNotReady':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'zundoko/entitiesBeingFetched':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'zundoko/entitiesFetchSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = true;
        // eslint-disable-next-line no-case-declarations
        const normalizedZundokos = normalizeZundokos(action.payload.zundoko.entities);
        // eslint-disable-next-line no-param-reassign
        draft.data.ids = normalizedZundokos.result;
        // eslint-disable-next-line no-param-reassign
        draft.data.entities = normalizedZundokos.entities[zundokoNormalizrSchemaKey];
        break;
      case 'zundoko/entityBeingFetched':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'zundoko/entityFetchSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = true;

        if (!draft.data.entities[action.payload.zundoko.entity.id]) {
          draft.data.ids.push(action.payload.zundoko.entity.id);
        }
        // eslint-disable-next-line no-param-reassign
        draft.data.entities[action.payload.zundoko.entity.id] = action.payload.zundoko.entity;
        break;
      case 'zundoko/entityBeingAdded':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingPosted = true;
        break;
      case 'zundoko/entityPostSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingPosted = false;
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;

        if (action.payload.zundoko.word === 'Zun') {
          zunCount += 1;
        } else {
          // Doko

          if (zunCount === 4) {
            // eslint-disable-next-line no-param-reassign
            draft.gotToKiyoshi = true;
          }
          zunCount = 0;
        }
        break;
      case 'zundoko/entityPostFailed':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingPosted = false;
        break;
      case 'zundoko/entitiesBeingDeleted':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingDeleted = true;
        break;
      case 'zundoko/entitiesDeleteSucceeded':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingDeleted = false;
        // eslint-disable-next-line no-param-reassign
        draft.dataReady = false;
        break;
      case 'zundoko/entitiesDeleteFailed':
        // eslint-disable-next-line no-param-reassign
        draft.dataBeingDeleted = false;
        break;
      case 'kiyoshi/entityBeingAdded':
        // eslint-disable-next-line no-param-reassign
        draft.gotToKiyoshi = false;
        break;
      default:
        // eslint-disable-next-line no-case-declarations
        const _: never = action; // ensure that a case clause exists for every expected action.
        Object.isFrozen(_); // pretend to use _ to make tsc happier.
    }
  },
  initialState,
);

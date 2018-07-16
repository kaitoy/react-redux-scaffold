// @flow

import {
  ZUNDOKO_BUTTON_CLICKED,
  ZUNDOKO_FETCH_SUCCEEDED,
  ZUNDOKO_FETCH_FAILED,
  KIYOSHIED,
} from './actionTypes';

export type Action = {
  type: string,
  payload?: Object,
  meta?: Object,
};

export type ActionCreator = (payload?: Object, meta?: Object) => Action;

export function zundokoButtonClicked(payload: Object): Action {
  return {
    type: ZUNDOKO_BUTTON_CLICKED,
    payload,
  };
}

export function zundokoFetchSucceeded(payload: Object, meta: Object): Action {
  return {
    type: ZUNDOKO_FETCH_SUCCEEDED,
    payload,
    meta,
  };
}

export function zundokoFetchFailed(payload: Object): Action {
  return {
    type: ZUNDOKO_FETCH_FAILED,
    payload,
  };
}

export function kiyoshied(): Action {
  return {
    type: KIYOSHIED,
  };
}

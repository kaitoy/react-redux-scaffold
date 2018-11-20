import Redux from 'redux';

import {
  ZUNDOKO_BUTTON_CLICKED,
  ZUNDOKO_FETCH_SUCCEEDED,
  ZUNDOKO_FETCH_FAILED,
  KIYOSHIED,
} from './actionTypes';

export interface ZundokoAction<Type, Payload = undefined, Meta = undefined>
  extends Redux.Action<Type> {
  error?: boolean;
  payload?: Payload;
  meta?: Meta;
}

export type ZundokoButtonClicked = ZundokoAction<typeof ZUNDOKO_BUTTON_CLICKED, Object>;
export function zundokoButtonClicked(payload: Object): ZundokoButtonClicked {
  return { type: ZUNDOKO_BUTTON_CLICKED, payload };
}

interface ZundokoFetchSucceededPayload {
  zundoko: string;
}
export interface ZundokoFetchSucceeded
  extends ZundokoAction<typeof ZUNDOKO_FETCH_SUCCEEDED, ZundokoFetchSucceededPayload, Object> {
  payload: ZundokoFetchSucceededPayload;
}
export function zundokoFetchSucceeded(
  payload: ZundokoFetchSucceededPayload,
  meta: Object,
): ZundokoFetchSucceeded {
  return { type: ZUNDOKO_FETCH_SUCCEEDED, payload, meta };
}

export type ZundokoFetchFailed = ZundokoAction<typeof ZUNDOKO_FETCH_FAILED, Object>;
export function zundokoFetchFailed(payload: Object): ZundokoFetchFailed {
  return { type: ZUNDOKO_FETCH_FAILED, error: true, payload };
}

export type Kiyoshied = ZundokoAction<typeof KIYOSHIED>;
export function kiyoshied(): Kiyoshied {
  return { type: KIYOSHIED };
}

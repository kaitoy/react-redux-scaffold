// @flow

import axios from 'axios';

export const ZUNDOKO_URL = 'https://sv0jabh4qa.execute-api.us-west-2.amazonaws.com/default/zundoko';

export function getZundoko(): Promise<{ data: Object, status: number, statusText: string }> {
  return axios.get(ZUNDOKO_URL);
}

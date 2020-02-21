import axios from 'axios';

export const ZUNDOKO_URL = 'https://httpbin.org/uuid';

export type Uuid = {
  uuid: string;
};

export function getZundoko() {
  return axios.get<Uuid>(ZUNDOKO_URL);
}

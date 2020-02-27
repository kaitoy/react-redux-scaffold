import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://httpbin.org',
  timeout: 2000,
});
export const API_UUID = '/uuid';

export type Uuid = {
  uuid: string;
};

export function getZundoko() {
  return client.get<Uuid>(API_UUID);
}

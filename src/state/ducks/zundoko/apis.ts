import axios from 'axios';
import { Zundoko, validateZundokoList, validateZundoko } from './models';

/** The axios client, which is exported for testing purpose. */
export const client = axios.create({
  timeout: 2000,
});

/** The path of API to get zundokos */
export const API_ZUNDOKOS = '/api/v1/zundokos';

/**
 * Sends a GET request to {@link API_ZUNDOKOS}.
 *
 * @returns a Promise that's resolved with a list of zundokos.
 */
export const getZundokos = () =>
  client.get<Zundoko[]>(API_ZUNDOKOS).then((res) => validateZundokoList(res.data));

/**
 * Sends a GET request to {@link API_ZUNDOKOS} with an ID.
 *
 * @param id - An ID of Zundoko.
 * @returns a Promise that's resolved with a zundoko.
 */
export const getZundoko = (id: string) =>
  client.get<Zundoko>(`${API_ZUNDOKOS}/${id}`).then((res) => validateZundoko(res.data));

/**
 * Sends a POST request to {@link API_ZUNDOKOS}.
 *
 * @param zundoko - A Zundoko object.
 * @returns a Promise that's resolved when the post succeeded.
 */
export const postZundoko = (zundoko: Zundoko) => client.post(API_ZUNDOKOS, zundoko);

/**
 * Sends a DELETE request to {@link API_ZUNDOKOS}.
 *
 * @param id - An ID of Zundoko.
 * @returns a Promise that's resolved when the delete succeeded.
 */
export const deleteZundoko = (id: string) => client.delete(`${API_ZUNDOKOS}/${id}`);

/**
 * Sends DELETE requests to {@link API_ZUNDOKOS}.
 *
 * @param ids - An IDs of Zundoko.
 * @returns a Promise that's resolved when the all delete requests succeeded.
 */
export const deleteZundokos = (ids: string[]) => axios.all(ids.map((id) => deleteZundoko(id)));

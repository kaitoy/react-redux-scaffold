import axios from 'axios';
import { Kiyoshi, validateKiyoshiList, validateKiyoshi } from './models';

/** The axios client, which is exported for testing purpose. */
export const client = axios.create({
  timeout: 2000,
});

/** The path of API to get kiyoshies */
export const API_KIYOSHIES = '/api/v1/kiyoshies';

/**
 * Sends a GET request to {@link API_KIYOSHIES}.
 *
 * @returns a Promise that's resolved with a list of kiyoshies.
 */
export const getKiyoshies = () =>
  client.get<Kiyoshi[]>(API_KIYOSHIES).then((res) => validateKiyoshiList(res.data));

/**
 * Sends a GET request to {@link API_KIYOSHIES} with an ID.
 *
 * @param id - An ID of Kiyoshi.
 * @returns a Promise that's resolved with a kiyoshi.
 */
export const getKiyoshi = (id: string) =>
  client.get<Kiyoshi>(`${API_KIYOSHIES}/${id}`).then((res) => validateKiyoshi(res.data));

/**
 * Sends a POST request to {@link API_KIYOSHIES}.
 *
 * @param kiyoshi - A Kiyoshi object.
 * @returns a Promise that's resolved when the post succeeded.
 */
export const postKiyoshi = (kiyoshi: Kiyoshi) => client.post(API_KIYOSHIES, kiyoshi);

/**
 * Sends a DELETE request to {@link API_KIYOSHIES}.
 *
 * @param id - An ID of Kiyoshi.
 * @returns a Promise that's resolved when the delete succeeded.
 */
export const deleteKiyoshi = (id: string) => client.delete(`${API_KIYOSHIES}/${id}`);

/**
 * Sends DELETE requests to {@link API_KIYOSHIES}.
 *
 * @param ids - An IDs of Kiyoshi.
 * @returns a Promise that's resolved when the all delete requests succeeded.
 */
export const deleteKiyoshies = (ids: string[]) => axios.all(ids.map((id) => deleteKiyoshi(id)));

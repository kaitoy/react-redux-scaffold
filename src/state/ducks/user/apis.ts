import axios from 'axios';
import { User, validateUserList, validateUser } from './models';

/** The axios client, which is exported for testing purpose. */
export const client = axios.create({
  timeout: 2000,
});

/** The path of API to get users */
export const API_USERS = '/api/v1/users';

/**
 * Sends a GET request to {@link API_USERS}.
 *
 * @returns a Promise that's resolved with a list of users.
 */
export const getUsers = () =>
  client.get<User[]>(API_USERS).then((res) => validateUserList(res.data));

/**
 * Sends a GET request to {@link API_USERS} with an ID.
 *
 * @param id - An ID of User.
 * @returns a Promise that's resolved with a user.
 */
export const getUser = (id: string) =>
  client.get<User>(`${API_USERS}/${id}`).then((res) => validateUser(res.data));

/**
 * Sends a POST request to {@link API_USERS}.
 *
 * @param user - A User object.
 * @returns a Promise that's resolved when the post succeeded.
 */
export const postUser = (user: User) => client.post(API_USERS, user);

/**
 * Sends a DELETE request to {@link API_USERS}.
 *
 * @param id - An ID of User.
 * @returns a Promise that's resolved when the delete succeeded.
 */
export const deleteUser = (id: string) => client.delete(`${API_USERS}/${id}`);

/**
 * Sends DELETE requests to {@link API_USERS}.
 *
 * @param ids - An IDs of User.
 * @returns a Promise that's resolved when the all delete requests succeeded.
 */
export const deleteUsers = (ids: string[]) => axios.all(ids.map((id) => deleteUser(id)));

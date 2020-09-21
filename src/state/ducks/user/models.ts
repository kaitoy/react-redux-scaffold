import { schema, normalize, denormalize } from 'normalizr';
import Ajv from 'ajv';

// https://stackoverflow.com/questions/36148639/webpack-not-able-to-import-images-using-express-and-angular2-in-typescript
const swaggerSpec = require('~/swagger.yaml');

/**
 * The type of User.
 */
export type User = {
  /** ID */
  id: string;

  /** password */
  password: string;

  /** The name */
  name: string;

  /** The timestamp in ISO 8601 format. */
  dateOfBirth: string;
};

/**
 * The type of normalized User.
 */
export type NormalizedUser = User;

const ajv = new Ajv({ allErrors: true }).addSchema(swaggerSpec, 'zundoko-kiyoshi');
const doValidateUser = ajv.compile({
  $ref: 'zundoko-kiyoshi#/definitions/User',
});
const doValidateUsers = ajv.compile({
  type: 'array',
  items: {
    $ref: 'zundoko-kiyoshi#/definitions/User',
  },
});

/**
 * Validates a User object.
 *
 * @param obj - an object to validate.
 * @returns the validated given object.
 * @throws {Ajv.ValidationError} if the given object is not a valid User object.
 */
export const validateUser = (obj: any) => {
  doValidateUser(obj);
  if (doValidateUser.errors) {
    throw new Ajv.ValidationError(doValidateUser.errors);
  }
  return obj as User;
};

/**
 * Validates a User list.
 *
 * @param obj - an object to validate.
 * @returns the validated given object.
 * @throws {Ajv.ValidationError} if the given object is not a valid User list.
 */
export const validateUserList = (obj: any) => {
  doValidateUsers(obj);
  if (doValidateUsers.errors) {
    throw new Ajv.ValidationError(doValidateUsers.errors);
  }
  return obj as User[];
};

export const userSamples = Object.freeze([
  Object.freeze({
    id: 'Antonetta_Kuhn@gmail.com',
    password: 'j3Tish6Z',
    name: "Wyatt O'Connell",
    dateOfBirth: '2014-11-15',
  }),
  Object.freeze({
    id: 'Remington.Johnson@hotmail.com',
    password: 'n_HYiDhj',
    name: 'Antwon Auer',
    dateOfBirth: '2013-10-26',
  }),
  Object.freeze({
    id: 'Kimberly44@gmail.com',
    password: 'UkT7mDhT',
    name: 'Kylie Trantow',
    dateOfBirth: '2012-09-23',
  }),
  Object.freeze({
    id: 'Luis_Hartmann@yahoo.com',
    password: 'IBt6ivxG',
    name: 'Jessy Cronin',
    dateOfBirth: '2002-09-12',
  }),
] as User[]);

/**
 * The key of normalizr schema of User.
 */
export const userNormalizrSchemaKey = 'users';

/**
 * The normalizr schema of User.
 */
export const userNormalizrSchema = new schema.Entity<User>(
  userNormalizrSchemaKey,
  {},
  {
    idAttribute: 'id',
  },
);

/**
 * The type of normalized Users.
 */
export type NormalizedUsers = {
  [id: string]: NormalizedUser;
};

/**
 * Normalize Users.
 *
 * @param users - a list of {@link User} objects.
 * @returns normalized Users.
 */
export const normalizeUsers = (users: User[]) =>
  normalize<User, { [userNormalizrSchemaKey]: NormalizedUsers }, User['id'][]>(users, [
    userNormalizrSchema,
  ]);

/**
 * Denormalized Users.
 *
 * @param users - normalized Users.
 * @returns denormalized Users (i.e. a list of {@link User} objects).
 */
export const denormalizeUsers = (users: ReturnType<typeof normalizeUsers>): User[] =>
  denormalize(users.result, [userNormalizrSchema], users.entities);

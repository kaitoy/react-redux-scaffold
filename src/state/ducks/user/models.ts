import { schema, normalize, denormalize } from 'normalizr';
import joi from '@hapi/joi';

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

/**
 * The Joi schema of User.
 */
export const userJoiSchema = joi.object({
  id: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().required(),
  name: joi.string().required(),
  dateOfBirth: joi
    .string()
    .pattern(new RegExp(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/))
    .required(),
});

/**
 * Validates a User object.
 *
 * @param obj - an object to validate.
 * @returns the validated given object.
 * @throws {ValidationError} if the given object is not a valid User object.
 */
export const validateUser = (obj: any) => {
  joi.assert(obj, userJoiSchema.required());
  return obj as User;
};

/**
 * Validates a User list.
 *
 * @param obj - an object to validate.
 * @returns the validated given object.
 * @throws {ValidationError} if the given object is not a valid User list.
 */
export const validateUserList = (obj: any) => {
  joi.assert(obj, joi.array().items(userJoiSchema).required());
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
    dateOfBirth: '2012-9-23',
  }),
  Object.freeze({
    id: 'Luis_Hartmann@yahoo.com',
    password: 'IBt6ivxG',
    name: 'Jessy Cronin',
    dateOfBirth: '2002-9-12',
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

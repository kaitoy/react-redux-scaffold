import { schema, normalize, denormalize } from 'normalizr';
import Ajv from 'ajv';
import {
  User,
  userSamples,
  userNormalizrSchema,
  NormalizedUsers,
  userNormalizrSchemaKey,
} from '~/state/ducks/user/models';

// https://stackoverflow.com/questions/36148639/webpack-not-able-to-import-images-using-express-and-angular2-in-typescript
const swaggerSpec = require('~/swagger.yaml');

/**
 * The type of Kiyoshi.
 */
export type Kiyoshi = {
  /** ID */
  id: string;

  /** The timestamp in ISO 8601 format. */
  saidAt: string;

  /** A user who got this Kiyoshi */
  madeBy: User;
};

/**
 * The type of normalized Kiyoshi.
 */
export type NormalizedKiyoshi = Omit<Kiyoshi, 'madeBy'> & {
  /** An ID of a user who got this Kiyoshi */
  madeBy: User['id'];
};

const ajv = new Ajv({ allErrors: true }).addSchema(swaggerSpec, 'zundoko-kiyoshi');
const doValidateKiyoshi = ajv.compile({
  $ref: 'zundoko-kiyoshi#/definitions/Kiyoshi',
});
const doValidateKiyoshies = ajv.compile({
  type: 'array',
  items: {
    $ref: 'zundoko-kiyoshi#/definitions/Kiyoshi',
  },
});

/**
 * Validates a Kiyoshi object.
 *
 * @param obj - an object to validate.
 * @returns the validated given object.
 * @throws {Ajv.ValidationError} if the given object is not a valid Kiyoshi object.
 */
export const validateKiyoshi = (obj: any) => {
  doValidateKiyoshi(obj);
  if (doValidateKiyoshi.errors) {
    throw new Ajv.ValidationError(doValidateKiyoshi.errors);
  }
  return obj as Kiyoshi;
};

/**
 * Validates a Kiyoshi list.
 *
 * @param obj - an object to validate.
 * @returns the validated given object.
 * @throws {Ajv.ValidationError} if the given object is not a valid Kiyoshi list.
 */
export const validateKiyoshiList = (obj: any) => {
  doValidateKiyoshies(obj);
  if (doValidateKiyoshies.errors) {
    throw new Ajv.ValidationError(doValidateKiyoshies.errors);
  }
  return obj as Kiyoshi[];
};

export const kiyoshiSamples = Object.freeze([
  Object.freeze({
    id: '015dd491-1b2f-4009-96d3-ae96c05b5f88',
    saidAt: '2019-10-28T06:21:21.355+0900',
    madeBy: userSamples[0],
  }),
  Object.freeze({
    id: 'f626d702-fbdd-46c1-a50c-728b1d630e34',
    saidAt: '2020-02-08T02:51:20.222Z',
    madeBy: userSamples[1],
  }),
  Object.freeze({
    id: '43f52641-b28b-4d38-8e28-ee620e979e72',
    saidAt: '2020-02-20T12:11:00.123Z',
    madeBy: userSamples[2],
  }),
  Object.freeze({
    id: '2b6a91e4-5ac5-4e9a-a679-03d9efa77e18',
    saidAt: '2020-03-12T22:41:05.444Z',
    madeBy: userSamples[3],
  }),
] as Kiyoshi[]);

/**
 * The key of normalizr schema of Kiyoshi.
 */
export const kiyoshiNormalizrSchemaKey = 'kiyoshies';

/**
 * The normalizr schema of Kiyoshi.
 */
export const kiyoshiNormalizrSchema = new schema.Entity<Kiyoshi>(
  kiyoshiNormalizrSchemaKey,
  { madeBy: userNormalizrSchema },
  {
    idAttribute: 'id',
  },
);

/**
 * The type of normalized Kiyoshies.
 */
export type NormalizedKiyoshies = {
  [id: string]: NormalizedKiyoshi;
};

/**
 * Normalize Kiyoshies.
 *
 * @param kiyoshies - a list of {@link Kiyoshi} objects.
 * @returns normalized Kiyoshies.
 */
export const normalizeKiyoshies = (kiyoshies: Kiyoshi[]) =>
  normalize<
    Kiyoshi,
    {
      [kiyoshiNormalizrSchemaKey]: NormalizedKiyoshies;
      [userNormalizrSchemaKey]: NormalizedUsers;
    },
    Kiyoshi['id'][]
  >(kiyoshies, [kiyoshiNormalizrSchema]);

/**
 * Denormalized Kiyoshies.
 *
 * @param kiyoshies - normalized Kiyoshies.
 * @returns denormalized Kiyoshies (i.e. a list of {@link Kiyoshi} objects).
 */
export const denormalizeKiyoshies = (kiyoshies: ReturnType<typeof normalizeKiyoshies>): Kiyoshi[] =>
  denormalize(kiyoshies.result, [kiyoshiNormalizrSchema], kiyoshies.entities);

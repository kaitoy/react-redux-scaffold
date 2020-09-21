import { schema, normalize, denormalize } from 'normalizr';
import Ajv from 'ajv';

// https://stackoverflow.com/questions/36148639/webpack-not-able-to-import-images-using-express-and-angular2-in-typescript
const swaggerSpec = require('~/swagger.yaml');

/**
 * The type of Zundoko.
 */
export type Zundoko = {
  /** ID */
  id: string;

  /** The timestamp in ISO 8601 format. */
  saidAt: string;

  /** The said word. */
  word: 'Zun' | 'Doko';
};

/**
 * The type of normalized Zundoko.
 */
export type NormalizedZundoko = Zundoko;

const ajv = new Ajv({ allErrors: true }).addSchema(swaggerSpec, 'zundoko-kiyoshi');
const doValidateZundoko = ajv.compile({
  $ref: 'zundoko-kiyoshi#/definitions/Zundoko',
});
const doValidateZundokos = ajv.compile({
  type: 'array',
  items: {
    $ref: 'zundoko-kiyoshi#/definitions/Zundoko',
  },
});

/**
 * Validates a Zundoko object.
 *
 * @param obj - an object to validate.
 * @returns the validated given object.
 * @throws {Ajv.ValidationError} if the given object is not a valid Zundoko object.
 */
export const validateZundoko = (obj: any) => {
  doValidateZundoko(obj);
  if (doValidateZundoko.errors) {
    throw new Ajv.ValidationError(doValidateZundoko.errors);
  }
  return obj as Zundoko;
};

/**
 * Validates a Zundoko list.
 *
 * @param obj - an object to validate.
 * @returns the validated given object.
 * @throws {Ajv.ValidationError} if the given object is not a valid Zundoko list.
 */
export const validateZundokoList = (obj: any) => {
  doValidateZundokos(obj);
  if (doValidateZundokos.errors) {
    throw new Ajv.ValidationError(doValidateZundokos.errors);
  }
  return obj as Zundoko[];
};

export const zundokoSamples = Object.freeze([
  Object.freeze({
    id: 'e669ac0d-a5c0-4cf8-a71f-7f0352a9ffdd',
    saidAt: '2019-12-28T06:51:20.355Z',
    word: 'Zun',
  }),
  Object.freeze({
    id: 'c0c8f87f-eaff-4913-8266-4c8ff12448c7',
    saidAt: '2019-12-28T06:51:20.355Z',
    word: 'Zun',
  }),
  Object.freeze({
    id: 'c605c7bb-924d-48dd-ad23-c8863e48482e',
    saidAt: '2019-11-28T06:51:21.355Z',
    word: 'Doko',
  }),
  Object.freeze({
    id: '55d97503-4b35-4301-9341-d4b7bb041e46',
    saidAt: '2019-10-28T06:51:21.355Z',
    word: 'Doko',
  }),
] as Zundoko[]);

/**
 * The key of normalizr schema of Zundoko.
 */
export const zundokoNormalizrSchemaKey = 'zundokos';

/**
 * The normalizr schema of Zundoko.
 */
export const zundokoNormalizrSchema = new schema.Entity<Zundoko>(
  zundokoNormalizrSchemaKey,
  {},
  {
    idAttribute: 'id',
  },
);

/**
 * The type of normalized Zundokos.
 */
export type NormalizedZundokos = {
  [id: string]: NormalizedZundoko;
};

/**
 * Normalize Zundokos.
 *
 * @param zundokos - a list of {@link Zundoko} objects.
 * @returns normalized Zundokos.
 */
export const normalizeZundokos = (zundokos: Zundoko[]) =>
  normalize<Zundoko, { [zundokoNormalizrSchemaKey]: NormalizedZundokos }, Zundoko['id'][]>(
    zundokos,
    [zundokoNormalizrSchema],
  );

/**
 * Denormalized Zundokos.
 *
 * @param zundokos - normalized Zundokos.
 * @returns denormalized Zundokos (i.e. a list of {@link Zundoko} objects).
 */
export const denormalizeZundokos = (zundokos: ReturnType<typeof normalizeZundokos>): Zundoko[] =>
  denormalize(zundokos.result, [zundokoNormalizrSchema], zundokos.entities);

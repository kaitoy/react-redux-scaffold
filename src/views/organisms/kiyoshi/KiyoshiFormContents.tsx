import React, { FunctionComponent } from 'react';
import { UseFormMethods } from 'react-hook-form/dist/index.ie11';
import Grid from '@material-ui/core/Grid';
import { Kiyoshi } from '~/state/ducks/kiyoshi/models';
import TextField from '~/views/atoms/inputs/TextField';

/** The type of form data in {@link KiyoshiFormContents}. */
export type KiyoshiFormData = Kiyoshi;

/**
 * The type of props of KiyoshiFormContents.
 */
export type KiyoshiFormContentsProps = Readonly<{
  /**
   * A register method for {@link KiyoshiFormData}.
   */
  register: UseFormMethods<KiyoshiFormData>['register'];

  /** An entity to show. */
  entity: Kiyoshi;
}>;

const KiyoshiFormContents: FunctionComponent<KiyoshiFormContentsProps> = ({ register, entity }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        name="id"
        label="ID"
        defaultValue={entity.id}
        readOnly
        fullWidth
        inputRef={register}
      />
    </Grid>

    <Grid item xs={6}>
      <TextField
        name="saidAt"
        label="Said At"
        defaultValue={entity.saidAt}
        readOnly
        fullWidth
        inputRef={register}
      />
    </Grid>

    <Grid item xs={6}>
      <TextField
        name="madeBy"
        label="Made By"
        defaultValue={entity.madeBy.name}
        readOnly
        fullWidth
        inputRef={register}
      />
    </Grid>
  </Grid>
);

export default React.memo(KiyoshiFormContents);

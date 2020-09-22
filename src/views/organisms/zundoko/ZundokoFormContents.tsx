import React, { FunctionComponent } from 'react';
import { UseFormMethods } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import { Zundoko } from '~/state/ducks/zundoko/models';
import TextField from '~/views/atoms/inputs/TextField';

/** The type of form data in {@link ZundokoFormContents}. */
export type ZundokoFormData = Zundoko;

/**
 * The type of props of ZundokoFormContents.
 */
export type ZundokoFormContentsProps = Readonly<{
  /**
   * A register method for {@link ZundokoFormData}.
   */
  register: UseFormMethods<ZundokoFormData>['register'];

  /** An entity to show. */
  entity: Zundoko;
}>;

const ZundokoFormContents: FunctionComponent<ZundokoFormContentsProps> = ({ register, entity }) => (
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
        name="word"
        label="Word"
        defaultValue={entity.word}
        readOnly
        fullWidth
        inputRef={register}
      />
    </Grid>
  </Grid>
);

export default React.memo(ZundokoFormContents);

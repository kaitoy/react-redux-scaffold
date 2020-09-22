import React, { FunctionComponent } from 'react';
import { UseFormMethods } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import { User } from '~/state/ducks/user/models';
import TextField from '~/views/atoms/inputs/TextField';
import PasswordField from '~/views/atoms/inputs/PasswordField';
import DatePicker from '~/views/atoms/inputs/DatePicker';

/** The type of form data in {@link UserFormContents}. */
export type UserFormData = User;

/**
 * The type of props of UserFormContents.
 */
export type UserFormContentsProps = Readonly<{
  /**
   * A register method for {@link UserFormData}.
   */
  register: UseFormMethods<UserFormData>['register'];

  /** An entity to show. if omitted, shows a blank form. */
  entity?: User;
}>;

const UserFormContents: FunctionComponent<UserFormContentsProps> = ({ register, entity }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        name="id"
        label="ID"
        defaultValue={entity?.id}
        readOnly={!!entity}
        fullWidth
        inputRef={register}
      />
    </Grid>

    <Grid item xs={6}>
      <PasswordField
        name="password"
        label="Password"
        defaultValue={entity?.password}
        fullWidth
        inputRef={register}
      />
    </Grid>

    <Grid item xs={12}>
      <TextField name="name" label="Name" defaultValue={entity?.name} inputRef={register} />
    </Grid>

    <Grid item xs={6}>
      <DatePicker
        name="dateOfBirth"
        label="Date of Birth"
        defaultValue={entity?.dateOfBirth}
        inputRef={register}
      />
    </Grid>
  </Grid>
);

export default React.memo(UserFormContents);

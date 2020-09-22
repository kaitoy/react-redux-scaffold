import React, { FunctionComponent, useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { User } from '~/state/ducks/user/models';
import Autocomplete, { AutocompleteProps } from '~/views/atoms/inputs/Autocomplete';
import SignInButton, { SignInButtonProps } from '~/views/atoms/buttons/SignInButton';
import CenteringGridContainer from '~/views/atoms/CenteringGridContainer';

/** The type of form data in {@link SignInForm}. */
export type SignInFormData = { userID: User['id'] };

/**
 * The type of props of SignInForm.
 */
type SignInFormProps = Readonly<
  Pick<AutocompleteProps<User['id']>, 'inputRef'> & {
    /** Existing users */
    users: User[];

    onSignInButtonClick: SignInButtonProps['onSignInButtonClick'];
  }
>;

const SignInForm: FunctionComponent<SignInFormProps> = ({
  users,
  onSignInButtonClick,
  inputRef,
}) => {
  const [signInButtonDisabled, setSignInButtonDisabled] = useState(true);
  const onInputChange = useCallback(
    (_, userInput) => {
      if (users.find((user) => user.id === userInput)) {
        setSignInButtonDisabled(false);
      }
    },
    [users],
  );

  return (
    <CenteringGridContainer direction="column" alignItems="stretch" spacing={0}>
      <Grid item>
        <Typography align="center" color="primary" noWrap variant="h2">
          Zundoko Kiyoshi
        </Typography>
        <Typography align="center" color="secondary" gutterBottom noWrap variant="h5">
          with React + Redux
        </Typography>
      </Grid>
      <Grid item>
        <Autocomplete
          name="userID"
          label="User ID"
          inputRef={inputRef}
          options={users.map((user) => user.id).sort()}
          groupBy={(userID) => userID.charAt(0)}
          getOptionLabel={(userID) => userID}
          onInputChange={onInputChange}
        />
      </Grid>
      <Grid item>
        <SignInButton onSignInButtonClick={onSignInButtonClick} disabled={signInButtonDisabled} />
      </Grid>
    </CenteringGridContainer>
  );
};

export default React.memo(SignInForm);

import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import SignInForm, { SignInFormData } from '~/views/organisms/SignInForm';
import { getUsers, isUserDataReady } from '~/state/ducks/user/selectors';
import { userDataNotReady, usersBeingFetched } from '~/state/ducks/user/actions';
import { signedIn } from '~/state/ducks/app/actions';
import { useFetch } from '~/views/hooks';

const ZDKSignInForm: FunctionComponent = () => {
  const dataReady = useSelector(isUserDataReady);
  useFetch(dataReady, userDataNotReady(), usersBeingFetched());
  const users = useSelector(getUsers);
  const { register, handleSubmit } = useForm<SignInFormData>();
  const dispatch = useDispatch();
  const onSignInButtonClick = useCallback(
    handleSubmit(({ userID }) => {
      const selectedUser = users.find((user) => user.id === userID);
      if (selectedUser) {
        dispatch(signedIn(selectedUser));
      }
    }),
    [users],
  );

  return <SignInForm users={users} inputRef={register} onSignInButtonClick={onSignInButtonClick} />;
};

export default React.memo(ZDKSignInForm);

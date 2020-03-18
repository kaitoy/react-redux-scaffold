import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '~/state/ducks/app/selectors';
import { useQuery } from '~/views/hooks';
import ZDKSignInForm from '~/views/ecosystems/ZDKSignInForm';

const SignInFormView: FunctionComponent = () => {
  const currentUser = useSelector(getCurrentUser);
  const query = useQuery();

  if (currentUser) {
    const url = query.get('cb');
    if (url) {
      return <Redirect to={url} />;
    }
    return <Redirect to="/" />;
  }

  return <ZDKSignInForm />;
};

export default React.memo(SignInFormView);

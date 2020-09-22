import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UseFormMethods } from 'react-hook-form/dist/index.ie11';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StoreState, noop } from '~/state/ducks';
import { isUserDataReady, getUser } from '~/state/ducks/user/selectors';
import { userDataNotReady, userBeingFetched } from '~/state/ducks/user/actions';
import { useFetch } from '~/views/hooks';
import FormContainer from '~/views/atoms/FormContainer';
import UserFormContents, { UserFormData } from '~/views/organisms/user/UserFormContents';

/**
 * The type of props of UserForm.
 */
export type UserFormProps = Readonly<{
  /** The ID of a user this form shows. If omitted, shows a blank form */
  entityID?: string;

  /**
   * A register method for {@link UserFormData}.
   */
  register: UseFormMethods<UserFormData>['register'];

  /**
   * A callback to know whether the data table is ready.
   *
   * @param ready - True if ready; false otherwise.
   */
  setReady: (ready: boolean) => void;
}>;

const UserForm: FunctionComponent<UserFormProps> = ({ entityID, register, setReady }) => {
  const dataReady = useSelector(isUserDataReady);
  const fetching = useFetch(
    dataReady,
    entityID ? userDataNotReady() : noop(),
    entityID ? userBeingFetched(entityID) : noop(),
  );
  const user = useSelector((state: StoreState) =>
    entityID ? getUser(state, entityID) : undefined,
  );
  useEffect(() => (entityID ? setReady(!fetching) : setReady(true)), [
    entityID,
    setReady,
    fetching,
  ]);

  if (entityID && !user) {
    return <div>{entityID} is Not Found</div>;
  }

  return (
    <FormContainer>
      {fetching ? <CircularProgress /> : <UserFormContents register={register} entity={user} />}
    </FormContainer>
  );
};

export default React.memo(UserForm);

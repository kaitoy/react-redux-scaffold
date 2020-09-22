import path from 'path';
import React, { FunctionComponent, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form/dist/index.ie11';
import UserFormToolbar from '~/views/ecosystems/user/UserFormToolbar';
import { User } from '~/state/ducks/user/models';
import NewUserFormToolbar from '~/views/ecosystems/user/NewUserFormToolbar';
import { UserFormData } from '~/views/organisms/user/UserFormContents';
import UserForm from '~/views/ecosystems/user/UserForm';

/**
 * The type of props of UserFormView.
 */
export type UserFormViewProps = Readonly<{
  /** The URL of the user list view. */
  listViewURL: string;
}>;

const UserFormView: FunctionComponent<UserFormViewProps> = ({ listViewURL }) => {
  const [ready, setReady] = useState(false);
  const { register, handleSubmit } = useForm<UserFormData>();
  const { id } = useParams();
  const history = useHistory();
  const handleDeletionCompleted = useCallback(() => history.push(listViewURL), [
    history,
    listViewURL,
  ]);
  const handleSubmissionCompleted = useCallback(
    (submittedID: User['id']) => history.push(path.join(listViewURL, submittedID)),
    [history, listViewURL],
  );

  return (
    <>
      {id ? (
        <UserFormToolbar
          handleSubmit={handleSubmit}
          buttonsDisabled={!ready}
          handleDeletionCompleted={handleDeletionCompleted}
        />
      ) : (
        <NewUserFormToolbar
          handleSubmit={handleSubmit}
          buttonsDisabled={!ready}
          handleSubmissionCompleted={handleSubmissionCompleted}
        />
      )}
      <UserForm entityID={id} register={register} setReady={setReady} />
    </>
  );
};

export default React.memo(UserFormView);

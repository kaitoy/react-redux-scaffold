import React, { FunctionComponent, useState, useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import KiyoshiFormToolbar from '~/views/ecosystems/kiyoshi/KiyoshiFormToolbar';
import { KiyoshiFormData } from '~/views/organisms/kiyoshi/KiyoshiFormContents';
import KiyoshiForm from '~/views/ecosystems/kiyoshi/KiyoshiForm';

/**
 * The type of props of KiyoshiFormView.
 */
export type KiyoshiFormViewProps = Readonly<{
  /** The URL of the kiyoshi list view. */
  listViewURL: string;
}>;

const KiyoshiFormView: FunctionComponent<KiyoshiFormViewProps> = ({ listViewURL }) => {
  const [ready, setReady] = useState(false);
  const { register, handleSubmit } = useForm<KiyoshiFormData>();
  const { id } = useParams();
  const history = useHistory();
  const handleDeletionCompleted = useCallback(() => history.push(listViewURL), [
    history,
    listViewURL,
  ]);
  useEffect(() => {
    if (!id) {
      history.push(listViewURL);
    }
  }, [history, id, listViewURL]);

  if (!id) {
    history.push(listViewURL);
    return <></>;
  }

  return (
    <>
      <KiyoshiFormToolbar
        handleSubmit={handleSubmit}
        buttonsDisabled={!ready}
        handleDeletionCompleted={handleDeletionCompleted}
      />
      <KiyoshiForm entityID={id} register={register} setReady={setReady} />
    </>
  );
};

export default React.memo(KiyoshiFormView);

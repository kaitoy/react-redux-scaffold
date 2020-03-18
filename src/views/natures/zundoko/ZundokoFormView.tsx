import React, { FunctionComponent, useState, useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ZundokoFormToolbar from '~/views/ecosystems/zundoko/ZundokoFormToolbar';
import { ZundokoFormData } from '~/views/organisms/zundoko/ZundokoFormContents';
import ZundokoForm from '~/views/ecosystems/zundoko/ZundokoForm';

/**
 * The type of props of ZundokoFormView.
 */
export type ZundokoFormViewProps = Readonly<{
  /** The URL of the zundoko list view. */
  listViewURL: string;
}>;

const ZundokoFormView: FunctionComponent<ZundokoFormViewProps> = ({ listViewURL }) => {
  const [ready, setReady] = useState(false);
  const { register, handleSubmit } = useForm<ZundokoFormData>();
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
      <ZundokoFormToolbar
        handleSubmit={handleSubmit}
        buttonsDisabled={!ready}
        handleDeletionCompleted={handleDeletionCompleted}
      />
      <ZundokoForm entityID={id} register={register} setReady={setReady} />
    </>
  );
};

export default React.memo(ZundokoFormView);

import React, { useState, useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form/dist/index.ie11';
import ZundokoListToolbar from '~/views/ecosystems/zundoko/ZundokoListToolbar';
import ZundokoDataTable from '~/views/ecosystems/zundoko/ZundokoDataTable';
import { DataTableFormData } from '~/views/organisms/DataTable';
import KiyoshiDialog from '~/views/ecosystems/KiyoshiDialog';

// Wraps with forwardRef so that this component can be given a ref from its parent
// MUI component.
// https://material-ui.com/guides/composition/#caveat-with-refs
const ZundokoListView = React.forwardRef<HTMLElement>((_, ref) => {
  const [ready, setReady] = useState(false);
  const { register, handleSubmit } = useForm<DataTableFormData>();
  const { path } = useRouteMatch();
  const history = useHistory();
  const moveToForm = useCallback((key: string) => history.push(`${path}/${key}`), [history, path]);

  return (
    <>
      <ZundokoListToolbar handleSubmit={handleSubmit} buttonsDisabled={!ready} />
      <ZundokoDataTable register={register} setReady={setReady} ref={ref} moveToForm={moveToForm} />
      <KiyoshiDialog />
    </>
  );
});

export default React.memo(ZundokoListView);

import React, { useState, useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import KiyoshiListToolbar from '~/views/ecosystems/kiyoshi/KiyoshiListToolbar';
import KiyoshiDataTable from '~/views/ecosystems/kiyoshi/KiyoshiDataTable';
import { DataTableFormData } from '~/views/organisms/DataTable';

// Wraps with forwardRef so that this component can be given a ref from its parent
// MUI component.
// https://material-ui.com/guides/composition/#caveat-with-refs
const KiyoshiListView = React.forwardRef<HTMLElement>((_, ref) => {
  const [ready, setReady] = useState(false);
  const { register, handleSubmit } = useForm<DataTableFormData>();
  const { path } = useRouteMatch();
  const history = useHistory();
  const moveToForm = useCallback((key: string) => history.push(`${path}/${key}`), [history, path]);

  return (
    <>
      <KiyoshiListToolbar handleSubmit={handleSubmit} buttonsDisabled={!ready} />
      <KiyoshiDataTable register={register} setReady={setReady} ref={ref} moveToForm={moveToForm} />
    </>
  );
});

export default React.memo(KiyoshiListView);

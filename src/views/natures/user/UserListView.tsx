import React, { useState, useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form/dist/index.ie11';
import UserListToolbar from '~/views/ecosystems/user/UserListToolbar';
import UserDataTable from '~/views/ecosystems/user/UserDataTable';
import { DataTableFormData } from '~/views/organisms/DataTable';

/**
 * The type of props of UserListView.
 */
export type UserListViewProps = Readonly<{
  /** The path of the new form. */
  newFormPath: string;
}>;

// Wraps with forwardRef so that this component can be given a ref from its parent
// MUI component.
// https://material-ui.com/guides/composition/#caveat-with-refs
const UserListView = React.forwardRef<HTMLElement, UserListViewProps>(({ newFormPath }, ref) => {
  const [ready, setReady] = useState(false);
  const { register, handleSubmit } = useForm<DataTableFormData>();
  const { path } = useRouteMatch();
  const history = useHistory();
  const moveToForm = useCallback((key: string) => history.push(`${path}/${key}`), [history, path]);
  const openBlankForm = useCallback(() => history.push(`${path}/${newFormPath}`), [
    history,
    newFormPath,
    path,
  ]);

  return (
    <>
      <UserListToolbar
        handleSubmit={handleSubmit}
        buttonsDisabled={!ready}
        openBlankForm={openBlankForm}
      />
      <UserDataTable register={register} setReady={setReady} ref={ref} moveToForm={moveToForm} />
    </>
  );
});

export default React.memo(UserListView);

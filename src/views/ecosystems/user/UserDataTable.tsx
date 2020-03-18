import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DataTable, { DataTableProps } from '~/views/organisms/DataTable';
import { isUserDataReady, getUsers } from '~/state/ducks/user/selectors';
import { userDataNotReady, usersBeingFetched } from '~/state/ducks/user/actions';
import { useFetch } from '~/views/hooks';

const cols = ['ID', 'Name', 'Date of Birth'];

/**
 * The type of props of UserDataTable.
 */
type UserDataTableProps = Readonly<
  Pick<DataTableProps, 'register'> & {
    /**
     * A callback to know whether the data table is ready.
     *
     * @param ready - True if ready; false otherwise.
     */
    setReady: (ready: boolean) => void;

    /**
     * A method to move to the user form view for the given ID.
     *
     * @param id - An ID.
     */
    moveToForm: (id: string) => void;
  }
>;

// Wraps with forwardRef so that this component can be given a ref from its parent
// MUI component.
// https://material-ui.com/guides/composition/#caveat-with-refs
const UserDataTable = React.forwardRef<HTMLElement, UserDataTableProps>(
  ({ register, setReady, moveToForm }, ref) => {
    const dataReady = useSelector(isUserDataReady);
    const users = useSelector(getUsers);
    const fetching = useFetch(dataReady, userDataNotReady(), usersBeingFetched());
    useEffect(() => setReady(!fetching), [setReady, fetching]);

    const rows = users.map((user) => ({
      key: user.id,
      colValues: [user.id, user.name, user.dateOfBirth],
    }));

    return (
      <DataTable
        columns={cols}
        rows={rows}
        ref={ref}
        fetching={fetching}
        register={register}
        onInfoButtonClick={moveToForm}
      />
    );
  },
);

export default React.memo(UserDataTable);

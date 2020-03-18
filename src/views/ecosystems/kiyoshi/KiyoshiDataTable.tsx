import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DataTable, { DataTableProps } from '~/views/organisms/DataTable';
import { isKiyoshiDataReady, getKiyoshies } from '~/state/ducks/kiyoshi/selectors';
import { kiyoshiDataNotReady, kiyoshiesBeingFetched } from '~/state/ducks/kiyoshi/actions';
import { useFetch } from '~/views/hooks';

const cols = ['ID', 'Said At', 'Made By'];

/**
 * The type of props of KiyoshiDataTable.
 */
type KiyoshiDataTableProps = Readonly<
  Pick<DataTableProps, 'register'> & {
    /**
     * A callback to know whether the data table is ready.
     *
     * @param ready - True if ready; false otherwise.
     */
    setReady: (ready: boolean) => void;

    /**
     * A method to move to the kiyoshi form view for the given ID.
     *
     * @param id - An ID.
     */
    moveToForm: (id: string) => void;
  }
>;

// Wraps with forwardRef so that this component can be given a ref from its parent
// MUI component.
// https://material-ui.com/guides/composition/#caveat-with-refs
const KiyoshiDataTable = React.forwardRef<HTMLElement, KiyoshiDataTableProps>(
  ({ register, setReady, moveToForm }, ref) => {
    const dataReady = useSelector(isKiyoshiDataReady);
    const kiyoshies = useSelector(getKiyoshies);
    const fetching = useFetch(dataReady, kiyoshiDataNotReady(), kiyoshiesBeingFetched());
    useEffect(() => setReady(!fetching), [setReady, fetching]);

    const rows = kiyoshies.map((kiyoshi) => ({
      key: kiyoshi.id,
      colValues: [kiyoshi.id, kiyoshi.saidAt, kiyoshi.madeBy.name],
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

export default React.memo(KiyoshiDataTable);

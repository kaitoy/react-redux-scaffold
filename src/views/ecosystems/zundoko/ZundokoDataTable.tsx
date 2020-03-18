import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DataTable, { DataTableProps } from '~/views/organisms/DataTable';
import { isZundokoDataReady, getZundokos } from '~/state/ducks/zundoko/selectors';
import { zundokoDataNotReady, zundokosBeingFetched } from '~/state/ducks/zundoko/actions';
import { useFetch } from '~/views/hooks';

const cols = ['ID', 'Said At', 'Word'];

/**
 * The type of props of ZundokoDataTable.
 */
type ZundokoDataTableProps = Readonly<
  Pick<DataTableProps, 'register'> & {
    /**
     * A callback to know whether the data table is ready.
     *
     * @param ready - True if ready; false otherwise.
     */
    setReady: (ready: boolean) => void;

    /**
     * A method to move to the zundoko form view for the given ID.
     *
     * @param id - An ID.
     */
    moveToForm: (id: string) => void;
  }
>;

// Wraps with forwardRef so that this component can be given a ref from its parent
// MUI component.
// https://material-ui.com/guides/composition/#caveat-with-refs
const ZundokoDataTable = React.forwardRef<HTMLElement, ZundokoDataTableProps>(
  ({ register, setReady, moveToForm }, ref) => {
    const dataReady = useSelector(isZundokoDataReady);
    const zundokos = useSelector(getZundokos);
    const fetching = useFetch(dataReady, zundokoDataNotReady(), zundokosBeingFetched());
    useEffect(() => setReady(!fetching), [setReady, fetching]);

    const rows = zundokos.map((zd) => ({ key: zd.id, colValues: [zd.id, zd.saidAt, zd.word] }));

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

export default React.memo(ZundokoDataTable);

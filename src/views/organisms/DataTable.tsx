import React, { useState, useEffect, useCallback } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { FormContextValues } from 'react-hook-form';
import InfoButton from '~/views/atoms/buttons/InfoButton';
import SpacingCircularProgress from '~/views/atoms/SpacingCircularProgress';

/** The type of form data in {@link DataTable}. */
export type DataTableFormData = {
  /** A comma-separated list of keys of selected rows */
  selectedRows: string;
};

/**
 * The type of props of DataTable.
 */
export type DataTableProps = Readonly<{
  /** The columns to show the table header. */
  columns: string[];

  /** The rows to show the table body. */
  rows: { key: string; colValues: string[] }[];

  /** If true, shows a circular progress instead of data rows. */
  fetching: boolean;

  /**
   * A register method of react-hook-form.
   * This will be passed to the input "selectedRows" that holds an array of selected rows' keys.
   */
  register: FormContextValues<DataTableFormData>['register'];

  /** The event handler called when an info button on a row is clicked. */
  onInfoButtonClick: (key: string) => void;
}>;

// Wraps with forwardRef so that this component can be given a ref from its parent
// MUI component.
// https://material-ui.com/guides/composition/#caveat-with-refs
const DataTable = React.forwardRef<HTMLElement, DataTableProps>(
  ({ columns, rows, fetching, register, onInfoButtonClick }, ref) => {
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    useEffect(() => {
      setSelectedRows(new Set());
    }, [rows]);

    const rowCount = rows.length;
    const selectedRowCount = selectedRows.size;
    const handleClickSelectAll = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          setSelectedRows(new Set(rows.map((row) => row.key)));
          return;
        }
        setSelectedRows(new Set());
      },
      [rows],
    );
    const handleClickSelect = useCallback(
      (key: string) => {
        const selectedRowsSet = new Set(selectedRows);
        if (selectedRowsSet.has(key)) {
          selectedRowsSet.delete(key);
        } else {
          selectedRowsSet.add(key);
        }
        setSelectedRows(selectedRowsSet);
      },
      [selectedRows],
    );

    return (
      <>
        <input type="hidden" name="selectedRows" value={Array.from(selectedRows)} ref={register} />
        <TableContainer ref={ref} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRowCount > 0 && selectedRowCount < rowCount}
                    checked={rowCount > 0 && selectedRowCount === rowCount}
                    onChange={handleClickSelectAll}
                    inputProps={{ 'aria-label': 'select all' }}
                  />
                </TableCell>
                <TableCell padding="none" />
                {columns.map((col) => (
                  <TableCell key={col} align="center">
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {fetching && rowCount === 0 ? (
              <></>
            ) : (
              <TableBody>
                {rows.map((row) => {
                  const selected = selectedRows.has(row.key);
                  return (
                    <TableRow hover key={row.key} selected={selected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={() => {
                            handleClickSelect(row.key);
                          }}
                          checked={selected}
                        />
                      </TableCell>
                      <TableCell padding="none">
                        <InfoButton onInfoButtonClick={() => onInfoButtonClick(row.key)} />
                      </TableCell>
                      {row.colValues.map((val, idx) => (
                        <TableCell
                          key={`${row.key}_${columns[idx]}`}
                          component={idx === 0 ? 'th' : 'td'}
                          scope={idx === 0 ? 'row' : undefined}
                          align="center"
                        >
                          {val}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {fetching && rowCount === 0 ? <SpacingCircularProgress m={2} /> : <></>}
      </>
    );
  },
);

export default React.memo(DataTable);

import React, { FunctionComponent, useState } from 'react';
import {
  KeyboardDatePicker as MuiKeyboardDatePicker,
  KeyboardDatePickerProps as MuiKeyboardDatePickerProps,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';

/**
 * The type of props of DatePicker.
 */
export type DatePickerProps = Readonly<
  Required<Pick<MuiKeyboardDatePickerProps, 'name' | 'label'>> &
    Pick<MuiKeyboardDatePickerProps, 'inputRef'> & {
      /** If true or omitted, this input become read-only. */
      readOnly?: boolean;

      /** The default value (e.g. 1983-12-14). */
      defaultValue?: moment.MomentInput;
    }
>;

const DatePicker: FunctionComponent<DatePickerProps> = ({
  name,
  label,
  inputRef,
  readOnly,
  defaultValue,
}) => {
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(
    defaultValue ? moment(defaultValue) : null,
  );

  return (
    <MuiKeyboardDatePicker
      name={name}
      id={name}
      label={label}
      InputProps={{
        readOnly,
        inputProps: {
          'aria-label': `input-${name}`,
        },
      }}
      readOnly={readOnly}
      inputRef={inputRef}
      helperText={readOnly ? 'Read-only' : undefined}
      value={selectedDate}
      onChange={(date: MaterialUiPickersDate) => setSelectedDate(date)}
      format="YYYY-MM-DD"
      KeyboardButtonProps={readOnly ? { disabled: true } : undefined}
    />
  );
};

export default React.memo(DatePicker);

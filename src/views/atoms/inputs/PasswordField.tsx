import React, { FunctionComponent } from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';

/**
 * The type of props of TextField.
 */
export type TextFieldProps = Readonly<
  Required<Pick<MuiTextFieldProps, 'name' | 'label'>> &
    Pick<MuiTextFieldProps, 'defaultValue' | 'fullWidth' | 'inputRef'> & {
      /** If true or omitted, this input become read-only. */
      readOnly?: boolean;
    }
>;

const TextField: FunctionComponent<TextFieldProps> = ({
  name,
  label,
  defaultValue,
  fullWidth,
  inputRef,
  readOnly,
}) => (
  <MuiTextField
    name={name}
    id={name}
    label={label}
    defaultValue={defaultValue}
    InputProps={{
      readOnly,
      inputProps: {
        'aria-label': `input-${name}`,
      },
    }}
    type="password"
    autoComplete="current-password"
    fullWidth={fullWidth}
    inputRef={inputRef}
    helperText={readOnly ? 'Read-only' : undefined}
  />
);

export default React.memo(TextField);

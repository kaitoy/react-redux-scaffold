import React from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from '@material-ui/lab/Autocomplete';

/**
 * The type of props of Autocomplete.
 */
export type AutocompleteProps<T> = Readonly<
  Required<Pick<MuiTextFieldProps, 'name' | 'label'>> &
    Pick<MuiTextFieldProps, 'inputRef' | 'defaultValue'> &
    Required<Pick<MuiAutocompleteProps<T>, 'options' | 'onInputChange'>> &
    Pick<MuiAutocompleteProps<T>, 'groupBy' | 'getOptionLabel'>
>;

const Autocomplete: <T>(
  props: AutocompleteProps<T>,
) => React.ReactElement<AutocompleteProps<T>> = ({
  name,
  label,
  inputRef,
  options,
  onInputChange,
  groupBy,
  getOptionLabel,
}) => (
  <MuiAutocomplete
    options={options}
    id={name}
    groupBy={groupBy}
    getOptionLabel={getOptionLabel}
    onInputChange={onInputChange}
    renderInput={(params) => {
      return (
        <MuiTextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          name={name}
          label={label}
          inputRef={inputRef}
        />
      );
    }}
  />
);

// Don't memoize in order to preserve generics.
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
export default Autocomplete;

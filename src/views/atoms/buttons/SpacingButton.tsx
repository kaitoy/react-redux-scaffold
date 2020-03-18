import Button, { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';
import { spacing, SpacingProps } from '@material-ui/system';

/**
 * The type of props of SpacingButton.
 */
export type SpacingButtonProps = Readonly<SpacingProps & ButtonProps>;

const SpacingButton = styled(Button)`
  ${spacing}
`;

export default SpacingButton;

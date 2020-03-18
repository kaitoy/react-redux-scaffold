import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { spacing, SpacingProps } from '@material-ui/system';
import styled from 'styled-components';

/**
 * The type of props of SpacingCircularProgress.
 */
export type SpacingButtonProps = Readonly<SpacingProps & CircularProgressProps>;

const SpacingCircularProgress = styled(CircularProgress)`
  ${spacing}
`;

export default SpacingCircularProgress;

import React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';
import styled from 'styled-components';

/**
 * The type of props of CenteringGridContainer.
 */
export type CenteringGridContainerProps = Readonly<GridProps>;

const CenteringGridContainer = styled((props: CenteringGridContainerProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Grid {...props} container justify="center" alignContent="center" />
))`
  min-height: 100vh;
  text-align: center;
`;

export default CenteringGridContainer;

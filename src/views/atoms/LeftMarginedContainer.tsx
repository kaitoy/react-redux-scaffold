import React from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';
import styled from 'styled-components';
import { spacing, SpacingProps } from '@material-ui/system';

/**
 * The type of props of LeftMarginedContainer.
 */
export type LeftMarginedContainerProps = Readonly<
  ContainerProps &
    SpacingProps & {
      /** The left margin (in px) of the container. */
      marginLeft: number;
    }
>;

const LeftMarginedContainer = styled(({ marginLeft, ...props }: LeftMarginedContainerProps) => (
  // Remove LeftMarginedContainerProps to suppress a runtime warning from react-dom.
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Container {...props} />
))`
  ${spacing}
  margin-left: ${({ marginLeft }: LeftMarginedContainerProps) => marginLeft}px;
  width: calc(100% - ${({ marginLeft }: LeftMarginedContainerProps) => marginLeft}px);
  text-align: center;
`;

export default LeftMarginedContainer;

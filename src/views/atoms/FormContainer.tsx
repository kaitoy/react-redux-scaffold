import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { spacing } from '@material-ui/system';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const SpacingContainer = styled(Container)`
  ${spacing}
  justify-content: center;
  display: flex;
  min-width: 30em;
  text-align: left;
`;

const FormContainer: FunctionComponent = ({ children }) => (
  <SpacingContainer maxWidth={false} component={Paper} p={2}>
    {children}
  </SpacingContainer>
);

export default FormContainer;

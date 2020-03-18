import React, { FunctionComponent } from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

/**
 * The type of props of InfoButton.
 */
export type InfoButtonProps = Readonly<{
  /** The event handler called when the info button is clicked */
  onInfoButtonClick: IconButtonProps['onClick'];
}>;

const InfoButton: FunctionComponent<InfoButtonProps> = ({ onInfoButtonClick }) => (
  <IconButton onClick={onInfoButtonClick} size="small" aria-label="info button">
    <InfoIcon color="primary" />
  </IconButton>
);

export default InfoButton;

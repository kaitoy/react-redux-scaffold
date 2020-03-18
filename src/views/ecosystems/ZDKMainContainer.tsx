import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import LeftMarginedContainer, {
  LeftMarginedContainerProps,
} from '~/views/atoms/LeftMarginedContainer';
import { isSidebarOpen } from '~/state/ducks/ui/selectors';

/**
 * The type of props of ZDKMainContainer.
 */
type ZDKMainContainerProps = Readonly<Pick<LeftMarginedContainerProps, 'marginLeft' | 'children'>>;

const ZDKMainContainer: FunctionComponent<ZDKMainContainerProps> = ({ marginLeft, children }) => {
  const sidebarOpen = useSelector(isSidebarOpen);
  const actualMarginLeft = sidebarOpen ? marginLeft : 0;

  return (
    <LeftMarginedContainer marginLeft={actualMarginLeft} maxWidth={false} pb={1}>
      {children}
    </LeftMarginedContainer>
  );
};

export default React.memo(ZDKMainContainer);

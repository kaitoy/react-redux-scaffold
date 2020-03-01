import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import TextList from '../components/TextList';
import { StoreState } from '../configureStore';

const selectZundokos = createSelector(
  ({ zundoko }: StoreState) => zundoko.zundokos,
  zundokos => zundokos,
);

const ZundokoList = () => {
  const zundokos = useSelector(selectZundokos);
  return <TextList textList={zundokos} />;
};

export default ZundokoList;

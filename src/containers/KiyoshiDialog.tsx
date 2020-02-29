import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import MyDialog from '../components/MyDialog';
import { Store } from '../configureStore';

const selectKiyoshiOpen = createSelector(
  ({ kiyoshi }: Store) => kiyoshi.open,
  open => open,
);

const KiyoshiDialog = () => {
  const open = useSelector(selectKiyoshiOpen);
  return <MyDialog text="キ・ヨ・シ！" open={open} />;
};

export default KiyoshiDialog;

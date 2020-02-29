import React from 'react';
import { useDispatch } from 'react-redux';
import ContainedButton from '../components/ContainedButton';
import { zundokoButtonClicked } from '../actions/actions';

const ZundokoButton = () => {
  const dispatch = useDispatch();
  return <ContainedButton text="ZUNDOKO" onClick={() => dispatch(zundokoButtonClicked({}))} />;
};

export default ZundokoButton;

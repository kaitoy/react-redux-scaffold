import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import ZundokoList from '../../containers/ZundokoList';
import rootReducer from '../../reducers/rootReducer';
import { zundokoFetchSucceeded } from '../../actions/actions';

describe('containers', () => {
  describe('ZundokoList', () => {
    test("shows no 'ズン' nor 'ドコ' with initial store", () => {
      const store = createStore(rootReducer);
      render(
        <Provider store={store}>
          <ZundokoList />
        </Provider>,
      );

      expect(screen.queryByText('ズン')).toBeNull();
      expect(screen.queryByText('ドコ')).toBeNull();
    });

    test("shows one 'ズン' if ZundokoFetchSucceeded with 'ズン' is dispatched", () => {
      const store = createStore(rootReducer);
      render(
        <Provider store={store}>
          <ZundokoList />
        </Provider>,
      );

      store.dispatch(
        zundokoFetchSucceeded({ zundoko: 'ズン' }, { statusCode: 200, statusText: 'test' }),
      );

      expect(screen.queryAllByText('ズン').length).toBe(1);
      expect(screen.queryByText('ドコ')).toBeNull();
    });
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './components/App';
import configureStore, { history } from './configureStore';

import(/* webpackPrefetch: true */ './fonts');

// const initialState = {
//   kiyoshi: { open: false },
//   zundokos: ['Zun', 'Zun'],
// };
const store = configureStore();
const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    root,
  );
}

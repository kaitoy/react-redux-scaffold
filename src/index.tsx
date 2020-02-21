import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './configureStore';

// const initialState = {
//   kiyoshi: { open: false },
//   zundoko: { zundokos: ['Zun', 'Zun'] },
// };
const store = configureStore();
const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root,
  );
}

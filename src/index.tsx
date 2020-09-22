import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
// import 'moment/locale/ja';
import AppRoutes from '~/views/AppRoutes';
import configureStore from '~/state/store';
import theme from '~/views/theme';

// A trick to tell babel to add a polyfill for Object.entries,
// which is needed because some npm packages uses the method
// and IE11 doesn't support it.
Object.entries({});

const root = document.getElementById('root');
const store = configureStore();
const Fonts = React.lazy(() => import(/* webpackPrefetch: true */ '~/views/fonts'));

const locale = 'en';
moment.locale(locale);

class LocalizedUtils extends MomentUtils {
  // eslint-disable-next-line class-methods-use-this
  getDatePickerHeaderText(date: moment.Moment) {
    return date.format('LL');
  }

  // eslint-disable-next-line class-methods-use-this
  getCalendarHeaderText(date: moment.Moment) {
    return date.format('MMM');
  }
}

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <CssBaseline />
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider libInstance={moment} utils={LocalizedUtils} locale={locale}>
              <AppRoutes />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
      <Suspense fallback={<></>}>
        <Fonts />
      </Suspense>
    </Provider>,
    root,
  );
}

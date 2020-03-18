import { createGlobalStyle } from 'styled-components';

// https://stackoverflow.com/questions/36148639/webpack-not-able-to-import-images-using-express-and-angular2-in-typescript
const roboto300 = require('typeface-roboto/files/roboto-latin-300.woff');
const roboto300Italic = require('typeface-roboto/files/roboto-latin-300italic.woff');
const roboto400 = require('typeface-roboto/files/roboto-latin-400.woff');
const roboto400Italic = require('typeface-roboto/files/roboto-latin-400italic.woff');
const roboto500 = require('typeface-roboto/files/roboto-latin-500.woff');
const roboto500Italic = require('typeface-roboto/files/roboto-latin-500italic.woff');

const Fonts = createGlobalStyle`
  /* roboto-300normal - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src:
      local('Roboto Light'),
      local('Roboto-Light'),
      url('${roboto300.default}') format('woff');
  }

  /* roboto-300italic - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-display: swap;
    font-weight: 300;
    src:
      local('Roboto Light italic'),
      local('Roboto-Lightitalic'),
      url('${roboto300Italic.default}') format('woff');
  }

  /* roboto-400normal - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src:
      local('Roboto Regular'),
      local('Roboto-Regular'),
      url('${roboto400.default}') format('woff');
  }

  /* roboto-400italic - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-display: swap;
    font-weight: 400;
    src:
      local('Roboto Regular italic'),
      local('Roboto-Regularitalic'),
      url('${roboto400Italic.default}') format('woff');
  }

  /* roboto-500normal - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src:
      local('Roboto Medium'),
      local('Roboto-Medium'),
      url('${roboto500.default}') format('woff');
  }

  /* roboto-500italic - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-display: swap;
    font-weight: 500;
    src:
      local('Roboto Medium italic'),
      local('Roboto-Mediumitalic'),
      url('${roboto500Italic.default}') format('woff');
  }
`;

export default Fonts;

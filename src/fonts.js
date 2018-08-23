import { injectGlobal } from 'styled-components';
import roboto300 from '../node_modules/typeface-roboto/files/roboto-latin-300.woff';
import roboto300Italic from '../node_modules/typeface-roboto/files/roboto-latin-300italic.woff';
import roboto400 from '../node_modules/typeface-roboto/files/roboto-latin-400.woff';
import roboto400Italic from '../node_modules/typeface-roboto/files/roboto-latin-400italic.woff';
import roboto500 from '../node_modules/typeface-roboto/files/roboto-latin-500.woff';
import roboto500Italic from '../node_modules/typeface-roboto/files/roboto-latin-500italic.woff';

/* eslint no-unused-expressions: ["error", { "allowTaggedTemplates": true }] */
injectGlobal`
  /* roboto-300normal - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src:
      local('Roboto Light '),
      local('Roboto-Light'),
      url('${roboto300}') format('woff');
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
      url('${roboto300Italic}') format('woff');
  }

  /* roboto-400normal - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src:
      local('Roboto Regular '),
      local('Roboto-Regular'),
      url('${roboto400}') format('woff');
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
      url('${roboto400Italic}') format('woff');
  }

  /* roboto-500normal - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src:
      local('Roboto Medium '),
      local('Roboto-Medium'),
      url('${roboto500}') format('woff');
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
      url('${roboto500Italic}') format('woff');
  }
`;

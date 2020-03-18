import { createMuiTheme } from '@material-ui/core';
import { enUS /* , jaJP */ } from '@material-ui/core/locale';

const elevation = 2;

const fontSize = 12;

const primary = {
  50: '#f2f8ef',
  100: '#dfedd8',
  200: '#c9e2be',
  300: '#b3d6a4',
  400: '#a3cd91',
  500: '#93c47d',
  600: '#8bbe75',
  700: '#80b66a',
  800: '#76af60',
  900: '#64a24d',
  A100: '#ffffff',
  A200: '#daffcd',
  A400: '#b4ff9a',
  A700: '#a1ff80',
  contrastText: '#fefefe',
};

const secondary = {
  50: '#fbeded',
  100: '#f6d1d1',
  200: '#f0b3b3',
  300: '#e99494',
  400: '#e57d7d',
  500: '#e06666',
  600: '#dc5e5e',
  700: '#d85353',
  800: '#d34949',
  900: '#cb3838',
  A100: '#ffffff',
  A200: '#ffe2e2',
  A400: '#ffafaf',
  A700: '#ff9696',
  contrastText: '#fefefe',
};

const MuiPickerOverride = {
  dense: {
    MuiPickersModal: {
      dialogRoot: {
        minWidth: fontSize * 2 * 10,
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        minWidth: undefined,
        minHeight: undefined,
      },
    },
    MuiPickersCalendar: {
      transitionContainer: {
        minHeight: fontSize * 12,
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        height: undefined,
        paddingTop: 4,
        paddingBottom: 8,
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        fontSize: fontSize * 1.6,
      },
    },
    MuiPickersDay: {
      day: {
        width: fontSize * 2,
        height: fontSize * 2,
      },
    },
    MuiPickersCalendarHeader: {
      iconButton: {
        padding: 2,
        marginLeft: 10,
        marginRight: 10,
      },
      dayLabel: {
        width: fontSize * 2,
      },
    },
  },
};

const theme = createMuiTheme(
  {
    palette: {
      primary,
      secondary,
    },
    typography: {
      fontSize,
      button: {
        textTransform: 'none',
      },
    },
    overrides: {
      MuiTableHead: {
        root: {
          backgroundColor: primary[100],
        },
      },
      ...MuiPickerOverride.dense,
    },
    props: {
      MuiTextField: {
        variant: 'outlined',
        margin: 'dense',
      },
      // @ts-ignore  'MuiAutocomplete' does not exist in type 'ComponentsProps'.ts(2322)
      MuiAutocomplete: {
        size: 'small',
      },
      MuiCheckbox: {
        color: 'primary',
      },
      MuiRadio: {
        color: 'primary',
      },
      MuiSwitch: {
        color: 'primary',
      },
      MuiList: {
        dense: true,
      },
      MuiTable: {
        size: 'small',
      },
      MuiButton: {
        size: 'small',
      },
      MuiToolbar: {
        variant: 'dense',
      },
      MuiListItemIcon: {
        style: {
          minWidth: 36,
        },
      },
      MuiAppBar: {
        elevation,
      },
      MuiDrawer: {
        elevation,
      },
      MuiPaper: {
        elevation,
      },
    },
  },
  enUS,
);

export default theme;

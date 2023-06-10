import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: '#eeeeee',
  100: '#FCFCFC',
  200: '#FCFCFC',
  300: '#FCFCFC',
  400: '#715740',
  500: '#41564b',
  600: '#462f1b',
  700: '#3c2918',
  800: '#26221F',
  900: '#000000',
};

const PRIMARY = {
  lighter: '#fff',
  light: '#DDE6ED',
  main: '#2c5aa0',
  dark: '#526D82',
  darker: '#27374D',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#ED9181',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#9eb3c2',
  light: '#1c7293',
  main: '#f3941a',
  dark: '#1b3b6f',
  darker: '#04297A',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#09b548',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#fff8d6',
  light: '#fff0ad',
  main: '#0299da',
  dark: '#efcd5d',
  darker: '#d3b44e',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#fff0f3',
  light: '#e01e37',
  main: '#aa0203',
  dark: '#b21e35',
  darker: '#85182a',
  contrastText: '#fff',
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: '#242423',
    secondary: "#333533",
    disabled: "#333533",
  },
  background: {
    paper: "#fff",
    default: "#d2ddf3",
    neutral: "#fff",
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha("#b3e098", 0.01),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;

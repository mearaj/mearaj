import {createTheme, responsiveFontSizes} from '@mui/material/styles';


const theme = createTheme({
  cssVariables: true,
  colorSchemes: {light: true, dark: true},
  palette: {
    mode: 'dark',
    primary: {main: '#7c5cff'},
    secondary: {main: '#00e5ff'},
    background: {default: '#0b1021', paper: 'rgba(17,22,51,0.6)'},
    text: {primary: '#E7E9EE', secondary: '#A7B0C0'},
  },
  shape: {borderRadius: 16},
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif',
    h1: {fontWeight: 900, letterSpacing: -0.5, fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)'},
    h2: {fontWeight: 800, letterSpacing: -0.3, fontSize: 'clamp(1.75rem, 2.4vw + 1rem, 2.5rem)'},
    h3: {fontWeight: 800, letterSpacing: -0.2, fontSize: 'clamp(1.5rem, 1.8vw + 1rem, 2rem)'},
    body1: {lineHeight: 1.7},
  },
  components: {
    MuiContainer: {defaultProps: {maxWidth: 'lg'}},
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))',
          border: '1px solid rgba(255,255,255,0.06)'
        }
      }
    },
    MuiButton: {defaultProps: {disableElevation: true}},
    MuiCard: {styleOverrides: {root: {position: 'relative', overflow: 'hidden'}}},
  },
});


export default responsiveFontSizes(theme);

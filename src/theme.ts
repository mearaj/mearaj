import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' }
  },
  typography: {
    fontFamily: 'Roboto, system-ui, Arial, sans-serif'
  },
  shape: {
    borderRadius: 12
  }
});

export default theme;

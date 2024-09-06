import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#13665D', // Colore principale del tema
    },
    background: {
      default: '#FFFDD0', // Colore di sfondo personalizzato
    },
  },
  typography: {
    fontFamily: 'FS Kim Bold, sans-serif',
  },
});

export default theme;

import { createTheme } from '@mui/material/styles';

// Premium Gold & Black Theme for Av. Yunus Emre Koçyiğit
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37',      // Elegant Gold
      light: '#F4D03F',     // Light Gold
      dark: '#B8960C',      // Dark Gold
      contrastText: '#0A0A0A',
    },
    secondary: {
      main: '#0A0A0A',      // Deep Black
      light: '#1A1A1A',     // Soft Black
      dark: '#000000',      // Pure Black
      contrastText: '#D4AF37',
    },
    background: {
      default: '#000000',   // Main background
      paper: '#111111',     // Card background
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(212, 175, 55, 0.2)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '4rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '12px 32px',
          fontSize: '0.95rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%)',
          backgroundSize: '200% 200%',
          color: '#0A0A0A',
          fontWeight: 600,
          '&:hover': {
            backgroundPosition: '100% 100%',
          },
        },
        outlined: {
          borderColor: '#D4AF37',
          borderWidth: 2,
          color: '#D4AF37',
          '&:hover': {
            borderWidth: 2,
            borderColor: '#F4D03F',
            backgroundColor: 'rgba(212, 175, 55, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(17, 17, 17, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            border: '1px solid rgba(212, 175, 55, 0.3)',
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(212, 175, 55, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(212, 175, 55, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#D4AF37',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-focused': {
              color: '#D4AF37',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(212, 175, 55, 0.2)',
        },
      },
    },
  },
});

export default theme;

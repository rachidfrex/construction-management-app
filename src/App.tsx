import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/layouts/Layout';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './context/ToastContext';
import { TranslationProvider } from './context/TranslationContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';

// Create theme with RTL support
const theme = createTheme({
  palette: {
    primary: {
      main: '#16a34a', // green-600
      light: '#22c55e', // green-500
      dark: '#15803d', // green-700
    },
    secondary: {
      main: '#2563eb', // blue-600
      light: '#3b82f6', // blue-500
      dark: '#1d4ed8', // blue-700
    },
    error: {
      main: '#dc2626', // red-600
      light: '#ef4444', // red-500
      dark: '#b91c1c', // red-700
    },
    warning: {
      main: '#d97706', // amber-600
      light: '#f59e0b', // amber-500
      dark: '#b45309', // amber-700
    },
    info: {
      main: '#2563eb', // blue-600
      light: '#3b82f6', // blue-500
      dark: '#1d4ed8', // blue-700
    },
    success: {
      main: '#16a34a', // green-600
      light: '#22c55e', // green-500
      dark: '#15803d', // green-700
    },
    background: {
      default: '#f9fafb', // gray-50
      paper: '#ffffff',
    },
    text: {
      primary: '#111827', // gray-900
      secondary: '#4b5563', // gray-600
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL || '/'}>
      <I18nextProvider i18n={i18n}>
        <TranslationProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <Layout>
                <AppRoutes />
              </Layout>
            </ToastProvider>
          </ThemeProvider>
        </TranslationProvider>
      </I18nextProvider>
    </Router>
  );
};

export default App;
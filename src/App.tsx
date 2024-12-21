import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/layouts/Layout';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './context/ToastContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  direction: 'ltr',
});

const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL || '/'}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
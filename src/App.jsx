import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import HeroEditor from './pages/admin/HeroEditor';
import AboutEditor from './pages/admin/AboutEditor';
import ServicesEditor from './pages/admin/ServicesEditor';
import ContactEditor from './pages/admin/ContactEditor';
import Messages from './pages/admin/Messages';
import ProtectedRoute from './pages/admin/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="hero" element={<HeroEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="services" element={<ServicesEditor />} />
              <Route path="contact" element={<ContactEditor />} />
              <Route path="messages" element={<Messages />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

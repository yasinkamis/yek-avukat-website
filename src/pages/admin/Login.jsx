import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState('');
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Geçersiz email adresi')
      .required('Email adresi gereklidir'),
    password: Yup.string()
      .min(6, 'Şifre en az 6 karakter olmalıdır')
      .required('Şifre gereklidir'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setGlobalError('');
      setLoading(true);

      try {
        await signIn(values.email, values.password);
        navigate('/admin/dashboard');
      } catch (err) {
        setGlobalError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#050505',
      }}
    >
      {/* Dynamic Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          background: `
            radial-gradient(circle at 15% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.05) 0%, transparent 25%)
          `
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
             {/* Logo image */}
             <Box
              component="img"
              src="/white_logo.png"
              alt="YEK"
              sx={{
                height: 40,
                width: 'auto',
                opacity: 0.9
              }}
            />
            <Typography 
              variant="overline" 
              sx={{ 
                color: 'rgba(255,255,255,0.6)', 
                letterSpacing: '0.2em',
                fontSize: '0.8rem',
                display: 'block'
              }}
            >
              Yönetim Paneli
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 4,
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            }}
          >
            {globalError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <Alert 
                  severity="error" 
                  variant="outlined"
                  sx={{ 
                    mb: 3, 
                    color: '#ff6b6b', 
                    borderColor: 'rgba(255, 107, 107, 0.3)',
                    '& .MuiAlert-icon': { color: '#ff6b6b' }
                  }}
                >
                  {globalError}
                </Alert>
              </motion.div>
            )}

            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block', ml: 1 }}>
                  E-POSTA ADRESİ
                </Typography>
                <TextField
                  fullWidth
                  placeholder="admin@yekavukat.com"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'rgba(255,255,255,0.3)' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: 'rgba(0,0,0,0.2)',
                      borderRadius: 2,
                      color: 'white',
                      '& fieldset': { border: '1px solid rgba(255,255,255,0.1)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2) !important' },
                      '&.Mui-focused fieldset': { borderColor: '#D4AF37 !important' },
                    }
                  }}
                  FormHelperTextProps={{ sx: { color: '#ff6b6b' } }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block', ml: 1 }}>
                  ŞİFRE
                </Typography>
                <TextField
                  fullWidth
                  placeholder="••••••••"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'rgba(255,255,255,0.3)' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: 'rgba(255,255,255,0.3)' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: 'rgba(0,0,0,0.2)',
                      borderRadius: 2,
                      color: 'white',
                      '& fieldset': { border: '1px solid rgba(255,255,255,0.1)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2) !important' },
                      '&.Mui-focused fieldset': { borderColor: '#D4AF37 !important' },
                    }
                  }}
                  FormHelperTextProps={{ sx: { color: '#ff6b6b' } }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ 
                  py: 1.8,
                  bgcolor: '#D4AF37',
                  color: '#000',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(212, 175, 55, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#F4D03F',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 30px rgba(212, 175, 55, 0.3)'
                  },
                  '&:disabled': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.3)'
                  }
                }}
              >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>
          </Paper>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography
              component="a"
              href="/"
              sx={{ 
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.85rem',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.3s ease',
                cursor: 'pointer',
                '&:hover': { color: '#D4AF37' }
              }}
            >
              ← Ana Sayfaya Dön
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;

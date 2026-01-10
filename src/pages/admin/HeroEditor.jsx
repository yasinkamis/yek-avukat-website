import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Container,
  Paper,
  InputAdornment
} from '@mui/material';
import { Save as SaveIcon, Title, Description, Campaign, Link as LinkIcon, Edit as EditIcon } from '@mui/icons-material';
import { getContent, updateContent } from '../../services/dataService';
import { useFormik } from 'formik';
import * as Yup from 'yup';



const CustomTextField = ({ label, name, icon, formik, ...props }) => (
  <Box sx={{ mb: 4 }}>
    <Typography
      variant="caption"
      sx={{
        color: 'rgba(255,255,255,0.5)',
        mb: 1,
        display: 'block',
        ml: 1,
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.05em'
      }}
    >
      {label}
    </Typography>
    <TextField
      fullWidth
      name={name}
      {...props}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">
            <Box sx={{ color: 'rgba(255,255,255,0.3)', display: 'flex' }}>
              {icon}
            </Box>
          </InputAdornment>
        ) : null,
        sx: {
          bgcolor: 'rgba(0,0,0,0.2)',
          borderRadius: 2,
          color: 'white',
          '& fieldset': { border: '1px solid rgba(255,255,255,0.1)' },
          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2) !important' },
          '&.Mui-focused fieldset': { borderColor: '#D4AF37 !important' },
          '& input': { py: 2 },
          '& textarea': { py: 1 }
        }
      }}
      FormHelperTextProps={{ sx: { color: '#ff6b6b' } }}
    />
  </Box>
);

const HeroEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validationSchema = Yup.object({
    title: Yup.string().required('Başlık gereklidir'),
    subtitle: Yup.string(),
    tagline: Yup.string(),
    photoUrl: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      subtitle: '',
      tagline: '',
      photoUrl: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        await updateContent('hero', values);
        setSnackbar({
          open: true,
          message: 'Ana sayfa içeriği başarıyla güncellendi!',
          severity: 'success'
        });
      } catch (error) {
        console.error('Error saving hero content:', error);
        setSnackbar({
          open: true,
          message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
          severity: 'error'
        });
      } finally {
        setSaving(false);
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent('hero');
        if (data) {
          formik.setValues({
            title: data.title || '',
            subtitle: data.subtitle || '',
            tagline: data.tagline || '',
            photoUrl: data.photoUrl || ''
          });
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#D4AF37' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
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
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: '#fff',
              ml: 2
            }}
          >
            Hero Düzenleme
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', ml: 12 }}>
          Ana sayfanızın açılış bölümündeki metinleri ve fotoğrafı buradan yönetebilirsiniz.
        </Typography>
      </Box>

      {/* Form */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          bgcolor: '#111',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 3
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField
            label="Ana Başlık (İsim Soyisim)"
            name="title"
            placeholder="Örn: Av. Yunus Emre Koçyiğit"
            icon={<Title />}
            formik={formik}
          />

          <CustomTextField
            label="Alt Başlık (Ünvan)"
            name="subtitle"
            placeholder="Örn: Avukat, Hukuk Danışmanı"
            icon={<Description />}
            formik={formik}
          />

          <CustomTextField
            label="Slogan / Açıklama"
            name="tagline"
            placeholder="Kısa ve etkileyici bir slogan"
            multiline
            rows={3}
            icon={<Campaign />}
            formik={formik}
          />

          <CustomTextField
            label="Ana Fotoğraf URL"
            name="photoUrl"
            placeholder="/yek.jpeg veya https://..."
            icon={<LinkIcon />}
            formik={formik}
          />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', mt: -2, mb: 4, ml: 1 }}>
            Not: Proje içindeki dosya yolunu (/yek.jpeg) veya harici bir görsel linkini giriniz.
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                borderColor: 'rgba(255,255,255,0.1)',
                '&:hover': { borderColor: '#fff', color: '#fff', bgcolor: 'transparent' }
              }}
              onClick={() => formik.resetForm()}
              disabled={saving}
            >
              Vazgeç
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              disabled={saving}
              sx={{
                px: 4,
                py: 1.5,
                bgcolor: '#D4AF37',
                color: '#000',
                fontWeight: 600,
                '&:hover': { bgcolor: '#F4D03F', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)' },
                '&:disabled': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            bgcolor: snackbar.severity === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)',
            color: '#fff'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HeroEditor;

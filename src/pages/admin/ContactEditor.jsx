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
  Grid,
  Divider,
  Paper,
  InputAdornment
} from '@mui/material';
import { Save as SaveIcon, Phone, Email, LocationOn, WhatsApp, LinkedIn, Instagram, Edit as EditIcon, QrCode } from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import { getContent, updateContent } from '../../services/dataService';
import { useFormik } from 'formik';
import * as Yup from 'yup';



const CustomTextField = ({ label, name, icon, formik, ...props }) => (
  <Box sx={{ mb: 3 }}>
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
          '& input': { py: 1.5 },
          '& textarea': { py: 1 }
        }
      }}
      FormHelperTextProps={{ sx: { color: '#ff6b6b' } }}
    />
  </Box>
);

const ContactEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validationSchema = Yup.object({
    phone: Yup.string(),
    email: Yup.string().email('Geçersiz email formatı'),
    address: Yup.string(),
    whatsapp: Yup.string(),
    linkedin: Yup.string().url('Geçersiz URL'),
    instagram: Yup.string().url('Geçersiz URL')
  });

  const formik = useFormik({
    initialValues: {
      phone: '',
      email: '',
      address: '',
      whatsapp: '',
      linkedin: '',
      instagram: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        await updateContent('contact', values);
        setSnackbar({
          open: true,
          message: 'İletişim bilgileri başarıyla güncellendi!',
          severity: 'success'
        });
      } catch (error) {
        console.error('Error saving contact content:', error);
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
        const data = await getContent('contact');
        if (data) {
          formik.setValues({
            phone: data.phone || '',
            email: data.email || '',
            address: data.address || '',
            whatsapp: data.whatsapp || '',
            linkedin: data.linkedin || '',
            instagram: data.instagram || ''
          });
        }
      } catch (error) {
        console.error('Error fetching contact content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate vCard for QR Code preview
  const generateVCard = () => {
    const { phone, email, address } = formik.values;
    return `BEGIN:VCARD
VERSION:3.0
N:Koçyiğit;Yunus Emre;;;
FN:Av. Yunus Emre Koçyiğit
TEL;TYPE=CELL:${phone}
EMAIL:${email}
ADR;TYPE=WORK:;;${address}
END:VCARD`;
  };



  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#D4AF37' }} />
      </Box>
    );
  }

  return (
    <Box>
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
            İletişim Düzenle
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', ml: 12 }}>
          İletişim bilgilerinizi ve sosyal medya bağlantılarınızı güncelleyin.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Form */}
        <Grid item xs={12} md={8}>
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
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#D4AF37' }}>
                Temel Bilgiler
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Telefon"
                    name="phone"
                    placeholder="+90 555 123 4567"
                    icon={<Phone />}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="WhatsApp"
                    name="whatsapp"
                    placeholder="+905551234567"
                    icon={<WhatsApp />}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="info@yekavukat.com"
                    icon={<Email />}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    label="Adres"
                    name="address"
                    placeholder="Ofis Adresi..."
                    multiline
                    rows={2}
                    icon={<LocationOn />}
                    formik={formik}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#D4AF37' }}>
                Sosyal Medya
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="LinkedIn URL"
                    name="linkedin"
                    placeholder="https://linkedin.com/..."
                    icon={<LinkedIn />}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Instagram URL"
                    name="instagram"
                    placeholder="https://instagram.com/..."
                    icon={<Instagram />}
                    formik={formik}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => formik.resetForm()}
                  disabled={saving}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    '&:hover': { borderColor: '#fff', color: '#fff', bgcolor: 'transparent' }
                  }}
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
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        {/* QR Code Preview */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: '#111',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              textAlign: 'center',
              p: 4,
              borderRadius: 3,
              position: 'sticky',
              top: 24
            }}
          >
            <Box sx={{ mb: 2, color: '#D4AF37' }}>
              <QrCode sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#fff' }}>
              Canlı QR Kod
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.5)' }}>
              Girilen bilgilerle otomatik güncellenir.
            </Typography>

            <Box
              sx={{
                display: 'inline-flex',
                p: 2,
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.15)'
              }}
            >
              <QRCodeSVG
                value={generateVCard()}
                size={160}
                level="M"
                fgColor="#000"
                bgColor="#fff"
              />
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'rgba(255,255,255,0.3)' }}>
              Müvekkilleriniz bu kodu okutarak bilgilerinizi rehbere kaydedebilir.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

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
    </Box>
  );
};

export default ContactEditor;

import { useState, useEffect, useRef } from 'react';
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
  Avatar,
  InputAdornment,
  Paper,
  Divider
} from '@mui/material';
import { Save as SaveIcon, CloudUpload as UploadIcon, Person, Work, School, History, Title, Edit as EditIcon, Stars } from '@mui/icons-material';
import { getContent, updateContent, uploadImage } from '../../services/dataService';
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

const AboutEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validationSchema = Yup.object({
    name: Yup.string().required('İsim Soyisim gereklidir'),
    title: Yup.string(),
    bio: Yup.string(),
    education: Yup.string(),
    experience: Yup.string(),
    expertise: Yup.string(),
    photoUrl: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
      bio: '',
      education: '',
      experience: '',
      expertise: '',
      photoUrl: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        await updateContent('about', values);
        setSnackbar({
          open: true,
          message: 'Hakkımda bölümü başarıyla güncellendi!',
          severity: 'success'
        });
      } catch (error) {
        console.error('Error saving about content:', error);
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
        const data = await getContent('about');
        if (data) {
          formik.setValues({
            name: data.name || '',
            title: data.title || '',
            bio: data.bio || '',
            education: data.education || '',
            experience: data.experience || '',
            expertise: data.expertise || '',
            photoUrl: data.photoUrl || ''
          });
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
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
             Hakkımda Düzenle
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', ml: 12 }}>
          Profil bilgilerinizi ve biyografinizi buradan yönetebilirsiniz.
        </Typography>
      </Box>

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
          <Grid container spacing={5}>
            {/* Photo Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3, border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 3 }}>
                <Avatar
                  src={formik.values.photoUrl}
                  sx={{
                    width: 200,
                    height: 240,
                    borderRadius: 2,
                    mx: 'auto',
                    mb: 3,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    fontSize: '3rem',
                    fontFamily: '"Playfair Display", serif',
                    color: '#D4AF37'
                  }}
                  variant="square"
                >
                  {formik.values.name ? formik.values.name.charAt(0) : 'FK'}
                </Avatar>
                
                <CustomTextField
                  label="Fotoğraf URL"
                  name="photoUrl"
                  placeholder="/images/profil.jpg"
                  size="small"
                  formik={formik}
                />
                 <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', mt: 1, display: 'block' }}>
                  Manuel URL girişi (Storage kapalı).
                </Typography>
              </Box>
            </Grid>

            {/* Form Fields */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="İsim Soyisim"
                    name="name"
                    placeholder="Yunus Emre Koçyiğit"
                    icon={<Person />}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    label="Ünvan"
                    name="title"
                    placeholder="Avukat"
                    icon={<Title />}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    label="Biyografi"
                    name="bio"
                    placeholder="Kendinizi tanıtan profesyonel bir yazı..."
                    multiline
                    rows={6}
                    icon={<History />}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    label="Eğitim"
                    name="education"
                    placeholder="Hukuk Fakültesi"
                    icon={<School />}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    label="Deneyim"
                    name="experience"
                    placeholder="10+ Yıl"
                    icon={<Work />}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    label="Uzmanlık"
                    name="expertise"
                    placeholder="Ceza Hukuku"
                    icon={<Stars />}
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
            </Grid>
          </Grid>
        </form>
      </Paper>

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

export default AboutEditor;

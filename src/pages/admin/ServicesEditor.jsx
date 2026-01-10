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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  InputAdornment
} from '@mui/material';
import {
  Save as SaveIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Gavel,
  FamilyRestroom,
  Business,
  Work,
  AccountBalance,
  Description,
  Security,
  AttachMoney,
  Category
} from '@mui/icons-material';
import { getServices, addService, updateService, deleteService } from '../../services/dataService';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CustomTextField = ({ label, name, formik, ...props }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block' }}>
      {label.toUpperCase()}
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
);

const iconOptions = [
  { value: 'gavel', label: 'Ceza Hukuku', icon: <Gavel /> },
  { value: 'family', label: 'Aile Hukuku', icon: <FamilyRestroom /> },
  { value: 'business', label: 'Ticaret Hukuku', icon: <Business /> },
  { value: 'work', label: 'İş Hukuku', icon: <Work /> },
  { value: 'bank', label: 'Banka/İcra', icon: <AccountBalance /> },
  { value: 'document', label: 'Sözleşme', icon: <Description /> },
  { value: 'security', label: 'Güvenlik', icon: <Security /> },
  { value: 'money', label: 'Finans', icon: <AttachMoney /> }
];

const ServicesEditor = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validationSchema = Yup.object({
    title: Yup.string().required('Başlık gereklidir'),
    description: Yup.string().required('Açıklama gereklidir'),
    icon: Yup.string().required('İkon seçimi gereklidir'),
    order: Yup.number().required('Sıra numarası gereklidir').min(1)
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      icon: 'gavel',
      order: 1
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        if (editingService) {
          await updateService(editingService.id, values);
          setSnackbar({
            open: true,
            message: 'Hizmet başarıyla güncellendi!',
            severity: 'success'
          });
        } else {
          await addService(values);
          setSnackbar({
            open: true,
            message: 'Hizmet başarıyla eklendi!',
            severity: 'success'
          });
        }
        handleCloseDialog();
        fetchServices();
      } catch (error) {
        console.error('Error saving service:', error);
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

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenDialog = (service = null) => {
    if (service) {
      setEditingService(service);
      formik.setValues({
        title: service.title || '',
        description: service.description || '',
        icon: service.icon || 'gavel',
        order: service.order || services.length + 1
      });
    } else {
      setEditingService(null);
      formik.setValues({
        title: '',
        description: '',
        icon: 'gavel',
        order: services.length + 1
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingService(null);
    formik.resetForm();
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return;

    try {
      await deleteService(serviceToDelete.id);
      setSnackbar({
        open: true,
        message: 'Hizmet başarıyla silindi!',
        severity: 'success'
      });
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      setSnackbar({
        open: true,
        message: 'Silme işleminde bir hata oluştu.',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  const CustomTextField = ({ label, name, ...props }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block' }}>
        {label.toUpperCase()}
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
  );

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
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Box sx={{ p: 1, bgcolor: 'rgba(212, 175, 55, 0.1)', borderRadius: 2, color: '#D4AF37' }}>
              <Category />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: '#fff'
              }}
            >
              Hizmetler
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', ml: 7 }}>
            Uzmanlık alanlarınızı buradan ekleyip yönetebilirsiniz.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            bgcolor: '#D4AF37',
            color: '#000',
            fontWeight: 600,
            '&:hover': { bgcolor: '#F4D03F' }
          }}
        >
          Yeni Hizmet
        </Button>
      </Box>

      {/* Services List */}
      {services.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            bgcolor: '#111',
            border: '1px dashed rgba(255, 255, 255, 0.1)',
            p: 8,
            textAlign: 'center',
            borderRadius: 3
          }}
        >
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Henüz eklenmiş bir hizmet bulunmuyor.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => handleOpenDialog()}
            sx={{ borderColor: '#D4AF37', color: '#D4AF37' }}
          >
            İlk Hizmeti Ekle
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: '#111',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  height: '100%',
                  p: 3,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(212, 175, 55, 0.3)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)', color: '#D4AF37' }}>
                    {iconOptions.find(opt => opt.value === service.icon)?.icon || <Gavel />}
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(service)}
                      sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#fff' } }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(service)}
                      sx={{ color: 'rgba(244, 67, 54, 0.5)', '&:hover': { color: '#ff6b6b' } }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 1 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 2, minHeight: 40 }}>
                  {service.description.length > 80 ? service.description.substring(0, 80) + '...' : service.description}
                </Typography>

                <Box sx={{ px: 1.5, py: 0.5, bgcolor: 'rgba(255,255,255,0.05)', display: 'inline-block', borderRadius: 10 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                    Sıra: {service.order}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            color: '#fff'
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', pb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#D4AF37' }}>
            {editingService ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 4 }}>
          <Box sx={{ pt: 2 }}>
            <CustomTextField
              label="Başlık"
              name="title"
              placeholder="Ceza Hukuku"
              formik={formik}
            />
            <CustomTextField
              label="Açıklama"
              name="description"
              placeholder="Bu hizmet hakkında kısa bir açıklama..."
              multiline
              rows={3}
              formik={formik}
            />

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, display: 'block' }}>
                  İKON
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="icon"
                    value={formik.values.icon}
                    onChange={formik.handleChange}
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.2)',
                      color: '#fff',
                      borderRadius: 2,
                      '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' },
                      '.MuiSvgIcon-root': { color: 'rgba(255,255,255,0.5)' }
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: '#1a1a1a',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff',
                          '& .MuiMenuItem-root:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                          '& .Mui-selected': { bgcolor: 'rgba(212, 175, 55, 0.15) !important', color: '#D4AF37' }
                        }
                      }
                    }}
                  >
                    {iconOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          {option.icon}
                          {option.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  label="Sıra"
                  name="order"
                  type="number"
                  inputProps={{ min: 1 }}
                  formik={formik}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              borderColor: 'rgba(255,255,255,0.1)',
              '&:hover': { borderColor: '#fff', color: '#fff', bgcolor: 'transparent' }
            }}
          >
            İptal
          </Button>
          <Button
            onClick={formik.handleSubmit}
            variant="contained"
            disabled={saving}
            sx={{
              bgcolor: '#D4AF37',
              color: '#000',
              fontWeight: 600,
              '&:hover': { bgcolor: '#F4D03F' }
            }}
          >
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            color: '#fff'
          }
        }}
      >
        <DialogTitle sx={{ color: '#ff6b6b' }}>Hizmeti Sil</DialogTitle>
        <DialogContent>
          <Typography>
            "{serviceToDelete?.title}" hizmetini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: 'rgba(255,255,255,0.6)' }}
          >
            İptal
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ bgcolor: '#d32f2f' }}
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>

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

export default ServicesEditor;

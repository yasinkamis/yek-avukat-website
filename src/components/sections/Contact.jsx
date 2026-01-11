import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  Send,
  LinkedIn,
  Instagram
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addMessage } from '../../services/dataService';

const Contact = ({ contactInfo, heroContent }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validationSchema = Yup.object({
    name: Yup.string().required('İsim gerekli'),
    email: Yup.string().email('Geçerli bir email girin').required('Email gerekli'),
    phone: Yup.string().required('Telefon gerekli'),
    message: Yup.string().required('Mesaj gerekli').min(10, 'En az 10 karakter')
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', phone: '', message: '' },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await addMessage(values);
        setSnackbar({ open: true, message: 'Mesajınız başarıyla gönderildi!', severity: 'success' });
        resetForm();
      } catch (error) {
        console.error('Message send error:', error);
        setSnackbar({ open: true, message: 'Mesaj gönderilirken bir hata oluştu.', severity: 'error' });
      }
    }
  });

  const generateVCard = () => {
    const fullName = heroContent?.title || 'Av. Yunus Emre Koçyiğit';
    // Split name for vCard N field (Last;First;;;)
    const nameParts = fullName.replace('Av. ', '').split(' ');
    const lastName = nameParts.pop();
    const firstName = nameParts.join(' ');

    return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${fullName}
TEL;TYPE=CELL:${contactInfo?.phone || ''}
EMAIL:${contactInfo?.email || ''}
ADR;TYPE=WORK:;;${contactInfo?.address || ''}
END:VCARD`;
  };

  const contactItems = [
    { icon: <Phone sx={{ fontSize: 22 }} />, label: 'Telefon', value: contactInfo?.phone || '0 555 123 4567', href: `tel:${contactInfo?.phone || '05551234567'}` },
    { icon: <Email sx={{ fontSize: 22 }} />, label: 'Email', value: contactInfo?.email || 'info@yekavukat.com', href: `mailto:${contactInfo?.email || 'info@yekavukat.com'}` },
    { icon: <LocationOn sx={{ fontSize: 22 }} />, label: 'Adres', value: contactInfo?.address || 'İstanbul, Türkiye', href: null },
    { icon: <WhatsApp sx={{ fontSize: 22 }} />, label: 'WhatsApp', value: 'Mesaj Gönder', href: `https://wa.me/${(contactInfo?.whatsapp || '05551234567').replace(/\D/g, '')}` },
  ];

  return (
    <Box
      id="contact"
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 2 }, // Reduced mobile padding
        background: 'linear-gradient(180deg, #080808 0%, #0A0A0A 100%)'
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="overline"
              className="gold-text-animated"
              sx={{
                letterSpacing: '0.2em',
                fontSize: '0.8rem',
                mb: 1.5,
                display: 'block'
              }}
            >
              İLETİŞİM
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 600 }}
            >
              Bize Ulaşın
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={6}>
          {/* Left Side - Contact Info & QR */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Contact Items */}
                <Box>
                  {contactItems.map((item, index) => (
                    <Box
                      key={index}
                      component={item.href ? 'a' : 'div'}
                      href={item.href}
                      target={item.href?.startsWith('http') ? '_blank' : undefined}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        p: 3,
                        mb: 2,
                        borderRadius: 3,
                        border: '1px solid rgba(212, 175, 55, 0.05)',
                        bgcolor: 'rgba(255, 255, 255, 0.01)',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                        cursor: item.href ? 'pointer' : 'default',
                        '&:hover': item.href ? {
                          borderColor: 'rgba(212, 175, 55, 0.3)',
                          bgcolor: 'rgba(212, 175, 55, 0.05)',
                          transform: 'translateX(8px)'
                        } : {}
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'rgba(212, 175, 55, 0.1)',
                          color: '#D4AF37'
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="overline" color="text.secondary" fontSize="0.7rem" display="block" lineHeight={1.2}>
                          {item.label}
                        </Typography>
                        <Typography variant="h6" fontWeight={500} fontSize="1rem">
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Premium QR Card */}
                <Box
                  sx={{
                    position: 'relative',
                    p: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.1) 0%, rgba(10, 10, 10, 1) 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {/* QR Code */}
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: '#FFFFFF',
                        borderRadius: 2,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <QRCodeSVG
                        value={generateVCard()}
                        size={120}
                        level="M"
                        fgColor="#0A0A0A"
                        bgColor="#FFFFFF"
                      />
                    </Box>

                    {/* QR Info */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          mb: 1
                        }}
                      >
                        Hızlı İletişim
                      </Typography>
                      <Typography variant="body2" color="white" sx={{ opacity: 0.7 }} fontSize="0.9rem" lineHeight={1.6}>
                        Kameranızla tarayarak iletişim bilgilerini rehberinize kaydedin.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Side - Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Box
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  background: 'rgba(20, 20, 20, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, fontSize: '1.5rem', fontFamily: '"Playfair Display", serif' }}>
                  Mesaj Gönderin
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Adınız Soyadınız"
                        variant="filled"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="phone"
                        label="Telefon Numarası"
                        variant="filled"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="email"
                        label="E-posta Adresi"
                        type="email"
                        variant="filled"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="message"
                        label="Mesajınız"
                        multiline
                        rows={4}
                        variant="filled"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                        sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        endIcon={<Send />}
                        disabled={formik.isSubmitting}
                        sx={{ py: 1.8, fontSize: '1rem', fontWeight: 600 }}
                      >
                        Gönder
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;

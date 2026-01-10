import { Box, Container, Typography, IconButton, Divider } from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const Footer = ({ contactInfo, heroContent }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#050505',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        pt: 4,
        pb: 'calc(24px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <Container maxWidth="lg">
        {/* Logo and Tagline */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            component="img"
            src="/gold_logo.png"
            alt="YEK"
            sx={{ height: 40, mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
            {heroContent?.tagline || 'Hukukun Gücü, Güvenin Adresi'}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.08)', mb: 3 }} />

        {/* Contact Info */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
            flexWrap: 'wrap',
            mb: 3
          }}
        >
          {contactInfo?.phone && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ color: 'primary.main', fontSize: 16 }} />
              <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                {contactInfo.phone}
              </Typography>
            </Box>
          )}
          {contactInfo?.email && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon sx={{ color: 'primary.main', fontSize: 16 }} />
              <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                {contactInfo.email}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Social Icons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 3 }}>
          {contactInfo?.linkedin && (
            <IconButton
              href={contactInfo.linkedin}
              target="_blank"
              size="small"
              sx={{
                color: 'text.secondary',
                border: '1px solid rgba(212, 175, 55, 0.15)',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main'
                }
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          )}
          {contactInfo?.instagram && (
            <IconButton
              href={contactInfo.instagram}
              target="_blank"
              size="small"
              sx={{
                color: 'text.secondary',
                border: '1px solid rgba(212, 175, 55, 0.15)',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main'
                }
              }}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {/* Copyright */}
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          display="block"
          sx={{ opacity: 0.5, fontSize: '0.7rem' }}
        >
          © {currentYear} {heroContent?.title || 'Av. Yunus Emre Koçyiğit'}. Tüm hakları saklıdır. Developer: Yasin Kamış
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

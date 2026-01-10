import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, LinkedIn as LinkedInIcon, Instagram as InstagramIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Ana Sayfa', href: '#hero' },
  { label: 'Hakkımda', href: '#about' },
  { label: 'Hizmetler', href: '#services' },
  { label: 'İletişim', href: '#contact' }
];

const Navbar = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const { contactInfo } = props;

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          bgcolor: trigger ? 'rgba(10, 10, 10, 0.70)' : 'transparent',
          backdropFilter: trigger ? 'blur(20px)' : 'none',
          borderBottom: trigger ? '1px solid rgba(212, 175, 55, 0.1)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between', 
            py: { xs: 1.5, md: 2 },
            px: { xs: 2, md: 6 },
            maxWidth: 1400,
            mx: 'auto',
            width: '100%'
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              component="a"
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <Box
                component="img"
                src="/gold_logo.png"
                alt="YEK Logo"
                sx={{
                  height: { xs: 40, md: 50 },
                  width: 'auto',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 10,
                  px: 1,
                  py: 0.5,
                  border: '1px solid rgba(212, 175, 55, 0.1)'
                }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Box
                      component="button"
                      onClick={() => scrollToSection(item.href)}
                      sx={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.9rem',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 400,
                        px: 2.5,
                        py: 1.2,
                        borderRadius: 8,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#D4AF37',
                          bgcolor: 'rgba(212, 175, 55, 0.08)'
                        }
                      }}
                    >
                      {item.label}
                    </Box>
                  </motion.div>
                ))}
              </Box>

              {/* Social Icons (Desktop) */}
              {(contactInfo?.linkedin || contactInfo?.instagram) && (
                 <Box sx={{ display: 'flex', gap: 1 }}>
                    {contactInfo.linkedin && (
                      <IconButton 
                        href={contactInfo.linkedin} 
                        target="_blank"
                        size="small"
                        sx={{ color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}
                      >
                         <LinkedInIcon fontSize="small" />
                      </IconButton>
                    )}
                    {contactInfo.instagram && (
                      <IconButton 
                        href={contactInfo.instagram} 
                        target="_blank"
                        size="small"
                         sx={{ color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}
                      >
                         <InstagramIcon fontSize="small" />
                      </IconButton>
                    )}
                 </Box>
              )}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'primary.main',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 2,
                p: 1
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 320,
            bgcolor: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)'
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box
              component="img"
              src="/gold_logo.png"
              alt="YEK Logo"
              sx={{ height: 35 }}
            />
            <IconButton onClick={handleDrawerToggle} sx={{ color: 'primary.main' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem 
                  button 
                  onClick={() => scrollToSection(item.href)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    py: 2,
                    '&:hover': {
                      bgcolor: 'rgba(212, 175, 55, 0.08)'
                    }
                  }}
                >
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: { 
                        color: 'text.primary',
                        fontWeight: 500,
                        fontSize: '1.1rem'
                      }
                    }}
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>

           {/* Mobile Social Icons */}
           {(contactInfo?.linkedin || contactInfo?.instagram) && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                 {contactInfo.linkedin && (
                   <IconButton href={contactInfo.linkedin} target="_blank" sx={{ color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}>
                      <LinkedInIcon />
                   </IconButton>
                 )}
                 {contactInfo.instagram && (
                   <IconButton href={contactInfo.instagram} target="_blank" sx={{ color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}>
                      <InstagramIcon />
                   </IconButton>
                 )}
              </Box>
           )}
        </Box>
      </Drawer>

    </>
  );
};

export default Navbar;

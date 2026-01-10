import { Box, Container, Typography, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { KeyboardArrowDown } from '@mui/icons-material';

const Hero = ({ content }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <Box
      id="hero"
      sx={{
        minHeight: { xs: '100dvh', md: '100vh' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#050505',
        pt: { xs: 0, md: 0 } // Removed padding, will use flex centering
      }}
    >
      {/* Background/Photo Section */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0, // Resim solda
          width: { xs: '100%', md: '50%' },
          height: '100%',
          backgroundImage: `url(${content?.photoUrl || '/yek.jpeg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          zIndex: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0, // veya right:0 overlay yönünü değiştireceğiz
            width: '100%',
            height: '100%',
            background: {
              xs: 'linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.6) 50%, #050505 100%)', // Mobile: transparent top, dark bottom
              md: 'linear-gradient(to left, #050505 0%, rgba(5,5,5,0.8) 20%, rgba(5,5,5,0) 100%)' // Desktop fade
            }
          },
          // Extra overlay for better text readability on mobile
          '&::before': {
            content: { xs: '""', md: 'none' },
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0,0,0,0.2)', // Reduced global overlay opacity to see image better
            zIndex: 1
          }
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
        <Grid container alignItems="center" justifyContent="flex-end" sx={{ height: '100%', minHeight: '100vh' }}>
          <Grid item xs={12} md={6}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
                <Box sx={{ 
                  maxWidth: 600, 
                  px: { xs: 2, md: 4 },
                  pt: { xs: 0, md: 0 }, // Reduced mobile padding
                  textAlign: { xs: 'center', md: 'right' },
                  ml: { xs: 'auto', md: 'auto' }, 
                  mr: 0,
                  height: { xs: '100%', md: 'auto' }, 
                  display: { xs: 'flex', md: 'block' },
                  flexDirection: 'column'
                }}>
                  {/* Logo & Title Group */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'column' }, // Mobile: Row, Desktop: Column
                    alignItems: { xs: 'center', md: 'flex-end' }, // Mobile: Center align, Desktop: Right align
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    gap: { xs: 2, md: 0 },
                    mb: { xs: '45vh', md: 0 } // Move the gap here to push tagline down
                  }}>
                    {/* Logo */}
                    <motion.div variants={itemVariants}>
                      <Box
                        component="img"
                        src="/white_logo.png"
                        alt="Yunus Emre Koçyiğit"
                        sx={{
                          height: { xs: 50, md: 80 }, // Smaller on mobile
                          width: 'auto',
                          mb: { xs: 0, md: 4 },
                          opacity: 0.9,
                          display: 'block' 
                        }}
                      />
                    </motion.div>

                    {/* Text Container for Mobile Side-by-Side */}
                    <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                      {/* Main Title */}
                      <motion.div variants={itemVariants}>
                        <Typography
                          variant="h1"
                          sx={{
                            fontSize: { xs: '2rem', sm: '3.5rem', md: '4.5rem' }, // Much smaller on mobile
                            fontWeight: 700,
                            mb: { xs: 2, md: 2 },
                            color: '#FFFFFF',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                          }}
                        >
                          {content?.title || 'Av. Yunus Emre Koçyiğit'}
                        </Typography>
                      </motion.div>

                      {/* Subtitle/Tagline */}
                      <motion.div variants={itemVariants}>
                        <Typography
                          variant="h2"
                          className="gold-text"
                          sx={{
                            fontSize: { xs: '0.9rem', md: '1.5rem' },
                            fontWeight: 400,
                            mb: { xs: 0, md: 3 },
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                          }}
                        >
                          {content?.subtitle || 'Avukat'}
                        </Typography>
                      </motion.div>
                    </Box>
                  </Box>

                  <motion.div variants={itemVariants} style={{ marginTop: 'auto' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        mb: 4,
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        lineHeight: 1.8,
                        maxWidth: 500,
                        ml: 'auto',
                        mr: { xs: 'auto', md: 0 }, // Center on mobile, right on desktop
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {content?.tagline || 'Hukukun Gücü, Güvenin Adresi'}
                    </Typography>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div variants={itemVariants}>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 2, 
                      flexWrap: 'wrap',
                      justifyContent: { xs: 'center', md: 'flex-end' } 
                    }}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={scrollToContact}
                        sx={{
                          px: 5,
                          py: 1.8,
                          fontSize: '1rem',
                          fontWeight: 600,
                          minWidth: 180
                        }}
                      >
                        {content?.ctaText || 'İletişime Geçin'}
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                        sx={{
                          px: 5,
                          py: 1.8,
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: 'white',
                          borderColor: 'rgba(255,255,255,0.3)',
                          minWidth: 180,
                          backdropFilter: 'blur(5px)',
                          '&:hover': {
                            borderColor: '#D4AF37',
                            color: '#D4AF37',
                            bgcolor: 'rgba(212, 175, 55, 0.05)'
                          }
                        }}
                      >
                        Daha Fazla
                      </Button>
                    </Box>
                  </motion.div>
                </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <KeyboardArrowDown 
            sx={{ 
              color: 'rgba(212, 175, 55, 0.6)', 
              fontSize: 32,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
            }} 
          />
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Hero;

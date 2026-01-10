import { Box, Container, Typography, Grid, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { School, WorkHistory, Verified } from '@mui/icons-material';

const About = ({ content }) => {
  const stats = [
    { icon: <School />, label: 'Eğitim', value: content?.education || 'Hukuk Fakültesi' },
    { icon: <WorkHistory />, label: 'Deneyim', value: content?.experience || '10+ Yıl' },
    { icon: <Verified />, label: 'Uzmanlık', value: content?.expertise || 'Profesyonel Hizmet' }
  ];

  return (
    <Box
      id="about"
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 0 }, // Reduced mobile padding
        background: 'linear-gradient(180deg, #050505 0%, #0A0A0A 100%)',
        position: 'relative',
        scrollMarginTop: 20
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          {/* Photo Section */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -15,
                      left: -15,
                      right: 15,
                      bottom: 15,
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: 2,
                      zIndex: 0
                    }
                  }}
                >
                  <Avatar
                    src={content?.photoUrl}
                    alt={content?.name || 'Av. Yunus Emre Koçyiğit'}
                    sx={{
                      width: { xs: 240, md: 380 }, // Slightly smaller on mobile
                      height: { xs: 300, md: 450 },
                      borderRadius: 2,
                      bgcolor: 'rgba(17, 17, 17, 0.8)',
                      border: '1px solid rgba(212, 175, 55, 0.15)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      zIndex: 1
                    }}
                    variant="rounded"
                  />
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Content Section */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="overline"
                  className="gold-text-animated"
                  sx={{
                    letterSpacing: '0.3em',
                    fontSize: '0.8rem',
                    mb: 2,
                    display: 'block',
                    fontWeight: 600
                  }}
                >
                  HAKKIMDA
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    mb: 1,
                    fontSize: { xs: '2rem', md: '3rem' },
                    fontWeight: 700,
                    fontFamily: '"Playfair Display", serif'
                  }}
                >
                  {content?.name || 'Yunus Emre Koçyiğit'}
                </Typography>

                <Typography
                  variant="h5"
                  className="gold-text"
                  sx={{
                    fontWeight: 400,
                    mb: 4,
                    fontSize: { xs: '1.1rem', md: '1.4rem' }
                  }}
                >
                  {content?.title || 'Avukat'}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 5,
                    maxWidth: 600,
                    lineHeight: 1.9,
                    fontSize: '1.05rem',
                    mx: { xs: 'auto', md: 0 }
                  }}
                >
                  {content?.bio || 'Hukuk alanında uzman danışmanlık hizmeti sunuyoruz. Müvekkillerimizin haklarını korumak için titizlikle çalışıyoruz. Her dava için özel çözümler üretiyoruz.'}
                </Typography>
              </Box>

              {/* Stats */}
              <Grid container spacing={3} justifyContent="center" sx={{ textAlign: 'center' }}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: false }}
                      style={{ width: '100%', maxWidth: '300px', height: '100%', display: 'flex', justifyContent: 'center' }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          p: 3,
                          borderRadius: 2,
                          border: '1px solid rgba(212, 175, 55, 0.08)',
                          bgcolor: 'rgba(255, 255, 255, 0.01)',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            borderColor: 'rgba(212, 175, 55, 0.3)',
                            bgcolor: 'rgba(212, 175, 55, 0.03)',
                            transform: 'translateY(-5px)'
                          }
                        }}
                      >
                        <Box sx={{ color: '#D4AF37', mb: 1.5, '& svg': { fontSize: 28 } }}>
                          {stat.icon}
                        </Box>
                        <Typography variant="overline" color="text.secondary" display="block" fontSize="0.7rem" sx={{ mb: 0.5 }}>
                          {stat.label}
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'white' }}>
                          {stat.value}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;

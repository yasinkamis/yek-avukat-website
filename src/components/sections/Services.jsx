import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Gavel,
  FamilyRestroom,
  Business,
  AccountBalance,
  Description,
  Security,
  Work,
  LocalAtm
} from '@mui/icons-material';

const iconMap = {
  gavel: Gavel,
  family: FamilyRestroom,
  business: Business,
  bank: AccountBalance,
  document: Description,
  security: Security,
  work: Work,
  money: LocalAtm
};

const Services = ({ services = [] }) => {
  const displayServices = services;

  return (
    <Box
      id="services"
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 0 }, // Reduced mobile padding
        background: 'linear-gradient(180deg, #0A0A0A 0%, #080808 100%)'
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
              HİZMETLER
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 600,
                mb: 2
              }}
            >
              Uzmanlık Alanlarımız
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 3,
                bgcolor: '#D4AF37',
                mx: 'auto',
                borderRadius: 2
              }}
            />
          </Box>
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {displayServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Gavel;

            return (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(145deg, rgba(20,20,20,0.6) 0%, rgba(10,10,10,0.8) 100%)',
                      border: '1px solid rgba(212, 175, 55, 0.05)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        transform: 'translateY(-8px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        '& .service-icon': {
                          color: '#0A0A0A',
                          bgcolor: '#D4AF37',
                          transform: 'rotate(-5deg)'
                        }
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box
                        className="service-icon"
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'rgba(212, 175, 55, 0.08)',
                          mb: 3,
                          color: '#D4AF37',
                          transition: 'all 0.4s ease'
                        }}
                      >
                        <IconComponent sx={{ fontSize: 26 }} />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ mb: 2, fontWeight: 600, fontSize: '1.2rem', color: 'white' }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7, fontSize: '0.95rem' }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;

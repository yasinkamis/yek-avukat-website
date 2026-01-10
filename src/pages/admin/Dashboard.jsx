import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Container,
  Paper
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Gavel as ServiceIcon,
  Contacts as ContactIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  Message as MessageIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getContent, getServices, getMessages } from '../../services/dataService';
import { useAuth } from '../../contexts/AuthContext';

const dashboardCards = [
  {
    title: 'Ana Sayfa',
    icon: <HomeIcon sx={{ fontSize: 32 }} />,
    description: 'Hero bölümü ve giriş metinleri',
    path: '/admin/hero',
    statKey: 'hasHero'
  },
  {
    title: 'Hakkımda',
    icon: <PersonIcon sx={{ fontSize: 32 }} />,
    description: 'Biyografi ve kişisel bilgiler',
    path: '/admin/about',
    statKey: 'hasAbout'
  },
  {
    title: 'Hizmetler',
    icon: <ServiceIcon sx={{ fontSize: 32 }} />,
    description: 'Uzmanlık alanları yönetimi',
    path: '/admin/services',
    statKey: 'servicesCount'
  },
  {
    title: 'İletişim',
    icon: <ContactIcon sx={{ fontSize: 32 }} />,
    description: 'İletişim ve sosyal medya',
    path: '/admin/contact',
    statKey: 'hasContact'
  },
  {
    title: 'Mesajlar',
    icon: <MessageIcon sx={{ fontSize: 32 }} />,
    description: 'Gelen mesajları görüntüle',
    path: '/admin/messages',
    statKey: 'messagesCount' // New stat key
  }
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    servicesCount: 0,
    hasHero: false,
    hasAbout: false,
    hasContact: false
  });
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [hero, about, contact, services, messages] = await Promise.all([
          getContent('hero'),
          getContent('about'),
          getContent('contact'),
          getServices(),
          getMessages() // Add getMessages import first!
        ]);

        // Check if real content exists (basic check for title/name)
        setStats({
          servicesCount: services?.length || 0,
          messagesCount: messages?.length || 0,
          hasHero: !!(hero?.title),
          hasAbout: !!(about?.name),
          hasContact: !!(contact?.email)
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: '#D4AF37' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
           <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: '#fff',
              mb: 1
            }}
          >
            Yönetim Paneli
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
             Web sitenizin tüm içeriklerini buradan güncelleyebilirsiniz.
          </Typography>
        </Box>
        <Button 
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{ 
            color: 'rgba(255,255,255,0.6)', 
            borderColor: 'rgba(255,255,255,0.2)',
            '&:hover': { color: '#D4AF37', borderColor: '#D4AF37', bgcolor: 'rgba(212, 175, 55, 0.05)' }
          }}
          variant="outlined"
        >
          Çıkış Yap
        </Button>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3}>
        {dashboardCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: 3,
                  bgcolor: '#111',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(212, 175, 55, 0.3)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      bgcolor: 'rgba(212, 175, 55, 0.1)', 
                      color: '#D4AF37',
                      display: 'flex'
                    }}
                  >
                    {card.icon}
                  </Box>
                  
                  {/* Status Indicator */}
                  {card.statKey === 'servicesCount' ? (
                     <Box sx={{ textAlign: 'right' }}>
                       <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                         {stats.servicesCount}
                       </Typography>
                       <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                         Aktif
                       </Typography>
                     </Box>
                  ) : (
                    <Box 
                      sx={{ 
                        px: 1.5, 
                        py: 0.5, 
                        borderRadius: 10, 
                        bgcolor: stats[card.statKey] ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid',
                        borderColor: stats[card.statKey] ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: 600, 
                          color: stats[card.statKey] ? '#4caf50' : 'rgba(255,255,255,0.4)' 
                        }}
                      >
                        {stats[card.statKey] ? 'DOLU' : 'BOŞ'}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                  {card.title}
                </Typography>
                
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, lineHeight: 1.6 }}>
                  {card.description}
                </Typography>

                <Button
                  component={Link}
                  to={card.path}
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      borderColor: '#D4AF37',
                      color: '#D4AF37',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  Düzenle
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;

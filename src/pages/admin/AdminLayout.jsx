import { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Gavel as ServiceIcon,
  Contacts as ContactIcon,
  Logout as LogoutIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 260;

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { label: 'Ana Sayfa', icon: <HomeIcon />, path: '/admin/hero' },
  { label: 'Hakkımda', icon: <PersonIcon />, path: '/admin/about' },
  { label: 'Hizmetler', icon: <ServiceIcon />, path: '/admin/services' },
  { label: 'İletişim', icon: <ContactIcon />, path: '/admin/contact' }
];

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box
          component="img"
          src="/white_logo.png"
          alt="YEK"
          sx={{
            height: 20,
            width: 'auto',
            opacity: 0.9
          }}
        />
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'primary.main' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.1)' }} />

      {/* Menu Items */}
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ px: 2, mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={() => isMobile && setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                bgcolor: location.pathname === item.path ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                borderLeft: location.pathname === item.path ? '3px solid' : '3px solid transparent',
                borderLeftColor: location.pathname === item.path ? 'primary.main' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(212, 175, 55, 0.08)'
                }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.1)' }} />

      {/* View Site & Logout */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          component="a"
          href="/"
          target="_blank"
          sx={{
            borderRadius: 2,
            mb: 1,
            '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.08)' }
          }}
        >
          <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Siteyi Görüntüle" />
        </ListItemButton>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: 'error.main',
            '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.08)' }
          }}
        >
          <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Çıkış Yap" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            bgcolor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(212, 175, 55, 0.1)'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              src="/white_logo.png"
              alt="YEK"
              sx={{
                height: 20,
                width: 'auto',
                opacity: 0.9
              }}
            />
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
              borderRight: '1px solid rgba(212, 175, 55, 0.1)'
            }
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
              borderRight: '1px solid rgba(212, 175, 55, 0.1)'
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 }
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;

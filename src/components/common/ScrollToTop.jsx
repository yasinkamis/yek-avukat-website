import { useState, useEffect } from 'react';
import { Box, IconButton, useScrollTrigger, Zoom } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Zoom in={visible}>
      <Box
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 999
        }}
      >
        <IconButton
          onClick={scrollToTop}
          size="medium"
          sx={{
            bgcolor: '#D4AF37',
            color: '#000',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: '#F4D03F',
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(212, 175, 55, 0.6)'
            }
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </Box>
    </Zoom>
  );
};

export default ScrollToTop;

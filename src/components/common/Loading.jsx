import { Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#0A0A0A'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          component="img"
          src="/gold_logo.png"
          alt="Loading"
          sx={{
            height: 60,
            width: 'auto',
            mb: 4
          }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              border: '2px solid rgba(212, 175, 55, 0.2)',
              borderTop: '2px solid #D4AF37',
              borderRadius: '50%'
            }}
          />
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Loading;

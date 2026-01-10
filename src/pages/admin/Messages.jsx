import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  Chip
} from '@mui/material';
import { Delete as DeleteIcon, Email as EmailIcon, Message as MessageIcon } from '@mui/icons-material';
import { getMessages, deleteMessage } from '../../services/dataService';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setSnackbar({
        open: true,
        message: 'Mesajlar yüklenirken hata oluştu.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;

    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(msg => msg.id !== id));
      setSnackbar({
        open: true,
        message: 'Mesaj başarıyla silindi.',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      setSnackbar({
        open: true,
        message: 'Mesaj silinirken hata oluştu.',
        severity: 'error'
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#D4AF37' }} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box
            component="img"
            src="/white_logo.png"
            alt="YEK"
            sx={{
              height: 40,
              width: 'auto',
              opacity: 0.9
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: '#fff',
              ml: 2
            }}
          >
             Gelen Mesajlar
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', ml: 12 }}>
          Web sitesi üzerinden gönderilen iletişim formlarını buradan yönetebilirsiniz.
        </Typography>
      </Box>

      {messages.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 8,
            bgcolor: '#111',
            border: '1px dashed rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            borderRadius: 3
          }}
        >
          <EmailIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.1)', mb: 2 }} />
          <Typography color="text.secondary">
            Henüz hiç mesajınız yok.
          </Typography>
        </Paper>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            bgcolor: '#111', 
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: 3
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'rgba(212, 175, 55, 0.1)' }}>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Tarih</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Gönderen</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>İletişim</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Konu</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 600 }}>Mesaj</TableCell>
                <TableCell align="right" sx={{ color: '#D4AF37', fontWeight: 600 }}>İşlem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((msg) => (
                <TableRow 
                  key={msg.id}
                  sx={{ 
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('tr-TR') : '-'}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 500 }}>
                    {msg.name}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                       <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>{msg.email}</Typography>
                       {msg.phone && <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{msg.phone}</Typography>}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    {msg.subject || '-'}
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 300 }}>
                    {msg.message}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Sil">
                      <IconButton 
                        onClick={() => handleDelete(msg.id)}
                        sx={{ 
                          color: 'rgba(244, 67, 54, 0.7)',
                          '&:hover': { color: '#ef5350', bgcolor: 'rgba(244, 67, 54, 0.1)' }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            bgcolor: snackbar.severity === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)',
            color: '#fff'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Messages;

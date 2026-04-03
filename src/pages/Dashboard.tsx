import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper, Avatar, CircularProgress, AppBar, Toolbar, TextField } from '@mui/material';
import NotificationBell from '../components/NotificationBell';
import { sendNotification } from '../utils/sendNotification';

export default function Dashboard() {
  const [error, setError] = useState('');
  const [testMessage, setTestMessage] = useState('');
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  const handleSendTestNotification = async () => {
    if (currentUser && testMessage) {
      await sendNotification(currentUser.uid, testMessage);
      setTestMessage('');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <NotificationBell />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {userProfile ? (
              <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                {userProfile.role.charAt(0)}
              </Avatar>
            ) : (
              <CircularProgress />
            )}
            <Typography component="h1" variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Welcome, {currentUser?.email}
            </Typography>
            
            <Box sx={{ mt: 2, mb: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1, width: '100%' }}>
              <Typography variant="body1">
                <strong>User ID:</strong> {currentUser?.uid}
              </Typography>
              <Typography variant="body1">
                <strong>Role:</strong> {userProfile?.role || 'Loading...'}
              </Typography>
            </Box>

            {userProfile?.role === 'Admin' && (
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => navigate('/admin')}
                sx={{ mb: 4 }}
              >
                Go to Admin Dashboard
              </Button>
            )}

            <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField 
                size="small" 
                label="Test Notification" 
                value={testMessage} 
                onChange={(e) => setTestMessage(e.target.value)} 
              />
              <Button variant="contained" onClick={handleSendTestNotification}>
                Send Notification
              </Button>
            </Box>

            {error && <Typography color="error">{error}</Typography>}
            <Button variant="outlined" color="primary" onClick={handleLogout}>
              Log Out
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

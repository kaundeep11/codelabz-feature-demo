import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../firebase';
import { UserProfile, UserRole } from '../types';
import { 
  Box, Typography, Container, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, 
  CircularProgress, AppBar, Toolbar, Button 
} from '@mui/material';

export default function AdminDashboard() {
  const { userProfile, loading } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && userProfile?.role !== 'Admin') {
      navigate('/');
    }
  }, [userProfile, loading, navigate]);

  useEffect(() => {
    if (userProfile?.role !== 'Admin') return;

    const usersRef = ref(database, 'users');
    const notifRef = ref(database, 'notifications');

    const unsubUsers = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.entries(data).map(([uid, val]: [string, any]) => ({
          uid,
          email: val.email,
          role: val.role
        }));
        setUsers(userList);
      } else {
        setUsers([]);
      }
      setDataLoading(false);
    });

    const unsubNotifs = onValue(notifRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let count = 0;
        Object.values(data).forEach((userNotifs: any) => {
          count += Object.keys(userNotifs).length;
        });
        setTotalNotifications(count);
      } else {
        setTotalNotifications(0);
      }
    });

    return () => {
      unsubUsers();
      unsubNotifs();
    };
  }, [userProfile]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await update(ref(database, `users/${userId}`), {
        role: newRole
      });
    } catch (error) {
      console.error('Failed to update role', error);
    }
  };

  if (loading || dataLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (userProfile?.role !== 'Admin') {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Back to Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" gap={2} mb={4}>
          <Paper sx={{ p: 3, flex: 1, textAlign: 'center' }}>
            <Typography color="text.secondary" gutterBottom>Total Users</Typography>
            <Typography variant="h3">{users.length}</Typography>
          </Paper>
          <Paper sx={{ p: 3, flex: 1, textAlign: 'center' }}>
            <Typography color="text.secondary" gutterBottom>Total Notifications</Typography>
            <Typography variant="h3">{totalNotifications}</Typography>
          </Paper>
        </Box>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.uid}>
                    <TableCell>{user.uid}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <FormControl size="small">
                        <Select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.uid, e.target.value as UserRole)}
                        >
                          <MenuItem value="Viewer">Viewer</MenuItem>
                          <MenuItem value="Editor">Editor</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
}

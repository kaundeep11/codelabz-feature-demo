import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Box, Button, TextField, Typography, Container, Alert, Link, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Viewer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signup(email, password, role);
      navigate('/');
    } catch (err: any) {
      setError('Failed to create an account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <MenuItem value="Viewer">Viewer</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Box textAlign="center">
            <Link component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Log In"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

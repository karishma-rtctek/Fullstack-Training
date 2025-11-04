import { useEffect, useState } from 'react';
import { Typography, Alert, CircularProgress, Box } from '@mui/material';
import { checkBackendConnection } from '../services/api';

const Home = () => {
  const [backendStatus, setBackendStatus] = useState<'loading' | 'connected' | 'error'>('loading');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await checkBackendConnection();
        setBackendStatus('connected');
      } catch (error) {
        setBackendStatus('error');
      }
    };

    checkConnection();
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Our Fullstack App
      </Typography>

      {/* Backend Connection Status */}
      <Box sx={{ my: 2 }}>
        {backendStatus === 'loading' && (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={20} />
            <Typography>Checking backend connection...</Typography>
          </Box>
        )}
        {backendStatus === 'connected' && (
          <Alert severity="success">
            Backend is connected and running!
          </Alert>
        )}
        {backendStatus === 'error' && (
          <Alert severity="error">
            Cannot connect to backend. Please check if the server is running.
          </Alert>
        )}
      </Box>

      <Typography variant="body1" paragraph>
        This application combines features from multiple projects including:
      </Typography>
      <ul>
        <li>Task Management</li>
        <li>Note Taking</li>
        <li>Blog Posts</li>
        <li>Weather Information</li>
      </ul>
    </div>
  );
};

export default Home;

import React from 'react';
import { Box } from '@mui/material';

const statusConfig = {
  0: { color: '#939393', text: 'Unassigned' },
  1: { color: '#F9A33F', text: 'Assigned' },
  2: { color: 'Green', text: 'In Progress' },
  3: { color: '#1237BF', text: 'Completed' },
};

const StatusBadge = ({ status }) => {
  const { color, text } = statusConfig[status] || {};

  return (
    <Box sx={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '5px 10px',
      backgroundColor: 'transparent',
      borderRadius: '50px',
      color: color,
      fontWeight: 'bold',
      fontSize: '12px',
      border: '1px solid',
      borderColor: color // Add border style here
    }}>
      <Box sx={{
        width: '10px',
        height: '10px',
        backgroundColor: color,
        borderRadius: '50%',
        marginRight: '8px',
      }} />
      {text}
    </Box>
  );
};

export default StatusBadge;

import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Drivers = () => {
  return (
    <div>
      <Button
        sx={{ mt: 1, mb: 4 }}
        color="primary"
        variant="contained"
        component={Link}
        to="/dashboard/add-driver"
      >
        Add Driver
      </Button>

    </div>
  );
};

export default Drivers;

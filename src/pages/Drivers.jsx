//correct: version :2
import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { post } from '../api/api';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    post("/driver/get?active=false")
      .then((response) => {
        setDrivers(response.data);
        console.log("Drivers fetched successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
      });
  };

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
      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ textAlign: "center", m: 3 }}
        >
          Drivers List
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="drivers table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Truck License Plate</TableCell>
                <TableCell>Driver License</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver._id}>
                  <TableCell>{driver.email}</TableCell>
                  <TableCell>{driver.username}</TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>{driver.truckLicensePlateNumber}</TableCell>
                  <TableCell>{driver.driverLicense}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      component={Link}
                      to={`/dashboard/edit-driver/${driver._id}`}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default Drivers;





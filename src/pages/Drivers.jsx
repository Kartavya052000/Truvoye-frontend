//correct: version :2
import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { post } from '../api/api';
import '../styles/Drivers.css'

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
      
      <Grid item xs={12}>
        {/* <Typography
          variant="h5"
          component="h2"
          sx={{ textAlign: "left", m: 3 , color: "#1237BF"}}
        >
          Drivers
        </Typography>

        <Button
        sx={{ mt: 1, mb: 4, alignItems: "right" }}
        color="primary"
        variant="contained"
        component={Link}
        to="/dashboard/add-driver"
      >
        Add Driver
      </Button> */}
       <Grid container justifyContent="space-between" alignItems="center" sx={{ m: 2 }}>
      <Grid item>
        <Typography
          variant="h5"
          component="h2"
          sx={{ textAlign: 'left', color: '#1237BF' }}
        >
          Drivers
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ alignItems: 'right', marginRight: 6 , background: '#1237BF', color: 'white'}}
          
          variant="contained"
          component={Link}
          to="/dashboard/add-driver"
        >
          Add Driver
        </Button>
      </Grid>
    </Grid>

        <TableContainer  component={Paper}>
          <Table  aria-label="drivers table">
            <TableHead className='drivers-tablehead' sx={{borderBottomColor:'#F9A33F' ,border: '1px solid #F9A33F'}}>
              <TableRow class>
              <TableCell sx={{ color: '#1237BF', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#1237BF', fontWeight: 'bold' }}>Address</TableCell>
                <TableCell sx={{ color: '#1237BF', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: '#1237BF', fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell sx={{ color: '#1237BF' , fontWeight: 'bold'}}>Truck Plate</TableCell>
                <TableCell sx={{ color: '#1237BF', fontWeight: 'bold' }}>Driver License</TableCell>
                <TableCell sx={{ color: '#1237BF', fontWeight: 'bold' }}>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver._id}>
                  <TableCell>{driver.username}</TableCell>
                  <TableCell>{driver.address.formatted_address.substring(0, 20)}</TableCell>
                  <TableCell>{driver.email}</TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>{driver.truckLicensePlateNumber}</TableCell>
                  <TableCell>{driver.driverLicense}</TableCell>
                  <TableCell >
                    <Button sx={{ background: '#1237BF' }}
                      color="primary"
                      variant="contained"
                      component={Link}
                      to={`/dashboard/edit-driver/${driver._id}`}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow >
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </Grid>
    </div>
  );
};

export default Drivers;





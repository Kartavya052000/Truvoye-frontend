import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { post } from "../api/api";
import { Link } from 'react-router-dom';
import drivers from '../Assets/imagesV/Truck.svg'; // Import Link from React Router

const Tracking = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    post("/order/get")
    .then((response) => {
    setOrders(response.data);
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      const response = error.response;

      console.log(response);
      
    });
};

  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
  };

  return (
<div>
<Typography
          variant="h5"
          component="h2"
          sx={{ textAlign: 'left', color: '#1237BF', mt: 2 , mb:2 }}
        >
          Orders Tracking
        </Typography>
    
    <TableContainer component={Paper}>
    
      <Table sx={{ minWidth: 650 }} aria-label="order table">
        <TableHead className='drivers-tablehead' sx={{borderBottomColor:'#F9A33F' ,border: '1px solid #F9A33F'}}>
          <TableRow>
            <TableCell sx={{ color: '#1237BF', borderBottomColor:'#F9A33F',fontWeight: 'bold' }}>Order ID</TableCell>
            <TableCell sx={{ color: '#1237BF', fontWeight: 'bold', borderBottomColor:'#F9A33F' }} align="right">Pickup Address</TableCell>
            <TableCell sx={{ color: '#1237BF', fontWeight: 'bold', borderBottomColor:'#F9A33F'}} align="right">Receiver Address</TableCell>
            {/* <TableCell align="right">Weight</TableCell> */}
            <TableCell  sx={{ color: '#1237BF', fontWeight: 'bold',borderBottomColor:'#F9A33F' }} align="right">Pickup Date</TableCell>
            {/* <TableCell align="right">Status</TableCell> */}
            <TableCell sx={{ color: '#1237BF', fontWeight: 'bold' , borderBottomColor:'#F9A33F'}} align="right">Tracking Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order._id}>
              <TableCell component="th" scope="row">
                {order._id.substring(0, 10).toUpperCase()}
              </TableCell>
              <TableCell align="right">{order.pickup_address?.address_name}</TableCell>
              <TableCell align="right">{order.receiver_address?.address_name}</TableCell>
              {/* <TableCell align="right">{order.weight}</TableCell> */}
              <TableCell align="right">{new Date(order.pickup_date).toLocaleDateString()}</TableCell>
              {/* <TableCell align="right">{!order?.driver_id ? 'Unassigned' : 'Assigned'}</TableCell> */}
              <TableCell align="right">
                <Link to={`/dashboard/order-tracking/${order._id}`}>
                <img classname="sidebar-icons" src={drivers} alt="drivers-icon"/>
                  {/* <Avatar sx={{ bgcolor: blue }}>
                    &gt;
                  </Avatar> */}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default Tracking;

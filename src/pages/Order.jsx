// import React, { useState, useEffect } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Avatar from '@mui/material/Avatar';
// import { blue } from '@mui/material/colors';
// import { post } from "../api/api";
// import { Link } from 'react-router-dom'; // Import Link from React Router

// const Order = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     post("/order/get")
//     .then((response) => {
//     setOrders(response.data);
//     })
//     .catch((error) => {
//       console.error("Error submitting data:", error);
//       const response = error.response;

//       console.log(response);
      
//     });
// };

//   const getInitials = (name) => {
//     const parts = name.split(' ');
//     return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="order table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Order ID</TableCell>
//             <TableCell align="right">Pickup Address</TableCell>
//             <TableCell align="right">Receiver Address</TableCell>
//             <TableCell align="right">Weight</TableCell>
//             <TableCell align="right">Pickup Date</TableCell>
//             <TableCell align="right">Status</TableCell>
//             <TableCell align="right">Details</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {orders.map((order, index) => (
//             <TableRow key={order._id}>
//               <TableCell component="th" scope="row">
//                 {order._id}
//               </TableCell>
//               <TableCell align="right">{order.pickup_address?.address_name}</TableCell>
//               <TableCell align="right">{order.receiver_address?.address_name}</TableCell> 
//               <TableCell align="right">{order.weight}</TableCell>
//               <TableCell align="right">{new Date(order.pickup_date).toLocaleDateString()}</TableCell>
//               <TableCell align="right">{!order?.driver_id ? 'Unassigned' : 'Assigned'}</TableCell>
//               <TableCell align="right">
//                 <Link to={`/dashboard/order-details/${order._id}`}>
//                   <Avatar sx={{ bgcolor: blue }}>
//                     &gt;
//                   </Avatar>
//                 </Link>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default Order;
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import Avatar from '@mui/material/Avatar';
import { post } from '../api/api';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { blue } from '@mui/material/colors';
import details from '../Assets/imagesV/Details.svg';

const Order = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
    fetchDrivers();
  }, []);
  const fetchOrders = async () => {
    post("/order/get")
    .then((response) => {
      console.log(response.data,"data");
    setOrders(response.data);
    console.log(orders,"ORDERSSSSSS")
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      const response = error.response;
      console.log(response);
    });
};
  // fetching the Driver details:-
  // const Driver = () => {
    const [drivers, setdrivers] = useState([]);
    const fetchDrivers = async () => {
      post("/driver/get")
      .then((response) => {
      setdrivers(response.data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;
        console.log(response);
      });
    }
  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
  };
  return (
    <div>
    <h1 className="my-4 text-2xl font-bold" style={{ color: '#1237BF' }}>Orders</h1>
    <TableContainer component={Paper} >
      <Table  aria-label="order table">
        <TableHead  sx={{borderBottomColor:'#F9A33F' ,border: '1px solid #F9A33F'}}>
          <TableRow >
            <TableCell  sx={{ color: '#1237BF', fontWeight: 'bold', borderBottomColor:'#F9A33F' }}>ID</TableCell>
            <TableCell sx={{ color: '#1237BF', fontWeight: 'bold', borderBottomColor:'#F9A33F' }} align="right">Status</TableCell>
            {/* <TableCell align="right">Pickup</TableCell> */}
            <TableCell sx={{ color: '#1237BF', fontWeight: 'bold', borderBottomColor:'#F9A33F' }} align="right">Assigned Driver</TableCell>
            <TableCell sx={{ color: '#1237BF', fontWeight: 'bold', borderBottomColor:'#F9A33F' }} align="right">Date</TableCell>
            <TableCell sx={{ color: '#1237BF', fontWeight: 'bold', borderBottomColor:'#F9A33F'}}align="right">Destination</TableCell>
            <TableCell sx={{ color: '#1237BF', fontWeight: 'bold', borderBottomColor:'#F9A33F' }} align="right">Details</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell component="th" scope="row">
                {order._id.substring(0, 10).toUpperCase()}
              </TableCell>
              <TableCell align="right">{!order?.driver_id ? 'Unassigned' : 'Assigned'}</TableCell>
              <TableCell align="right">
              {!order?.driver_id ? 'None' : drivers.find(driver => driver.driver_id === order.driver_id)?.username || 'None'}
              </TableCell>
              <TableCell align="right">{new Date(order.pickup_date).toLocaleDateString()}</TableCell>
              <TableCell align="right">{order.receiver_address?.address_name}</TableCell>

              {/* <TableCell align="right">{order.pickup_address?.address_name}</TableCell> */}
             
              {/* <TableCell align="right">{order.receiver_address?.address_name}</TableCell> */}
              {/* <TableCell align="right">{order.weight}</TableCell> */}
              {/* <TableCell align="right">{new Date(order.pickup_date).toLocaleDateString()}</TableCell> */}

              
              
              
              

              <TableCell align="right">
                <Link to={`/dashboard/order-details/${order._id}`}>
                  {/* <Avatar sx={{ bgcolor: blue }} >
                    &gt;
                  </Avatar> */}
                  <img classname="details" src={details} alt="details-icon"/>
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
export default Order;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { post } from "../api/api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null); // Track selected driver for modal
  const [openModal, setOpenModal] = useState(false); // Modal state
  const { id } = useParams(); // Extract id from URL

  useEffect(() => {
    fetchOrderDetails();
    fetchDrivers();
  }, [id]); // Fetch details whenever id changes

  const fetchOrderDetails = async () => {
    post(`/order/get`)
    .then((response) => {
        setOrderDetails(response.data);
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      const response = error.response;

      console.log(response);
      
    });
};
const fetchDrivers = async () => {
    post("/driver/get?active=false",)
    .then((response) => {
        setDrivers(response.data);
        console.log(orderDetails,":oooo")
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      const response = error.response;

      console.log(response);
      
    });
};

  const handleAssignCheckboxChange = (driverId) => (event) => {
    // Handle checkbox change logic here
    const driver = drivers.find(driver => driver._id === driverId);
    setSelectedDriver(driver);
    setOpenModal(true); // Open modal when checkbox is clicked
 

    let data = {
      driverId: driverId,
      orderId:id
    }
    post("/orderDetails/assign-order", data)
    .then((response) => {
      setSelectedDriver(driver);
      setOpenModal(true); // Open modal when checkbox is clicked
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      const response = error.response;

      console.log(response);
      
    });
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleRequestDriver = () => {
    // Implement logic to send request to selected driver
    console.log(`Sending request to driver: ${selectedDriver.username}`);
    setOpenModal(false); // Close modal after handling request
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {orderDetails._id}</p>
      <p><strong>Pickup Address:</strong> {orderDetails.pickup_address}</p>
      <p><strong>Receiver Address:</strong> {orderDetails.receiver_address}</p>
      <p><strong>Weight:</strong> {orderDetails.weight}</p>
      <p><strong>Pickup Date:</strong> {new Date(orderDetails.pickup_date).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {orderDetails.order_status === 0 ? 'Unassigned' : 'Assigned'}</p>

      <h2>Drivers List</h2>
      <TableContainer component={Paper}>
        <Table aria-label="drivers table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Truck License Plate</TableCell>
              <TableCell>Assign</TableCell> {/* New column for checkboxes */}
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver._id}>
                <TableCell>{driver.email}</TableCell>
                <TableCell>{driver.username}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.truckLicensePlateNumber}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={false} // Adjust based on your logic if needed
                    onChange={handleAssignCheckboxChange(driver._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for confirmation */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="request-driver-modal"
        aria-describedby="request-driver-description"
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          outline: 'none',
          minWidth: '300px',
          maxWidth: '80%',
          textAlign: 'center'
        }}>
          <h2 id="request-driver-modal">Request Driver</h2>
          <p id="request-driver-description">Are you sure you want to send a request to {selectedDriver?.username}?</p>
          <Button variant="contained" onClick={handleRequestDriver}>Yes</Button>
          <Button variant="contained" onClick={handleModalClose}>No</Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetails;

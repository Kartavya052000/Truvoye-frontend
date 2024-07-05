import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { post } from "../api/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState({});
  const [selectedDriver, setSelectedDriver] = useState({}); // Track selected driver for modal
  const [openModal, setOpenModal] = useState(false); // Modal state
  const { id } = useParams(); // Extract id from URL
  useEffect(() => {
    fetchOrderDetails();
  }, [id]); // Fetch details whenever id changes

  let order = [];
  const fetchOrderDetails = async () => {
    const url = "/order/get/" + id;
    post(url)
      .then((response) => {
        const orders = response.data;
        // const order = orders.find((ord) => ord._id === id);
        setOrderDetails(orders.order); // Set the specific order details
        // setTimeout(()=>{
        fetchDrivers(orders.order);

        // },500)
        // console.log(order,"order");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;

        console.log(response);
      });
    // fetchDrivers();
  };

  const fetchDrivers = async (order) => {
    let driverurl = "";
    console.log(order?.order_status, "PPP{{");
    if (order?.order_status == 0) {
      driverurl = "/driver/get?active=false";
    } else {
      // alert(hit)
      driverurl = "/driver/get/" + order?.driver_id;
    }

    post(driverurl)
      .then((response) => {
        if(order)
          if (order?.order_status == 0) {
setDrivers(response.data)
          } else {
            // alert(hit)
            setDriver(response.data)
          }
        console.log(drivers, ":oooo");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;

        console.log(response);
      });
  };

  const handleAssignCheckboxChange = (driverId) => (event) => {
    // Handle checkbox change logic here
    const driver = drivers.find((driver) => driver._id === driverId);
    console.log(driver,"driver");
    setSelectedDriver(driver);
    setOpenModal(true); // Open modal when checkbox is clicked

 

  
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleRequestDriver = () => {
    // Implement logic to send request to selected driver
    console.log(`Sending request to driver: ${selectedDriver}`);
    setOpenModal(false); // Close modal after handling request
    let data = {
      driverId: selectedDriver._id,
      orderId: id,
    };
    post("/orderDetails/assign-order", data)
      .then((response) => {
        setSelectedDriver(driver);
        window.location.reload();
        // setOpenModal(true); // Open modal when checkbox is clicked
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;

        console.log(response);
      });

  };
  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p>
        <strong>Order ID:</strong> {orderDetails._id}
      </p>
      <p>
        <strong>Pickup Address:</strong>{" "}
        {orderDetails.pickup_address?.address_name}
      </p>
      <p>
        <strong>Receiver Address:</strong>{" "}
        {orderDetails.receiver_address?.address_name}
      </p>
      <p>
        <strong>Weight:</strong> {orderDetails.weight}
      </p>
      <p>
        <strong>Pickup Date:</strong>{" "}
        {new Date(orderDetails.pickup_date).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {orderDetails.order_status === 0 ? "Unassigned" : "Assigned"}
      </p>

      {/* {drivers && ( */}
      <>
        <h2>Drivers List</h2>
        <TableContainer component={Paper}>
          <Table aria-label="drivers table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Truck License Plate</TableCell>
              {orderDetails.order_status === 0 && (
                <TableCell>Assign</TableCell>
              )}
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetails.order_status === 0
                ? drivers.map((driver) => (
                    <TableRow key={driver._id}>
                      <TableCell>{driver.email}</TableCell>
                      <TableCell>{driver.username}</TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>{driver.truckLicensePlateNumber}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={false} // Adjust based on your logic if needed
                          onChange={handleAssignCheckboxChange(driver?._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : 
                    <TableRow key={driver._id}>
                      <TableCell>{driver?.email}</TableCell>
                      <TableCell>{driver?.username}</TableCell>
                      <TableCell>{driver?.phone}</TableCell>
                      <TableCell>{driver?.truckLicensePlateNumber}</TableCell>
                      {orderDetails.order_status === 0 && (

                      <TableCell>
                        <Checkbox
                          checked={false} // Adjust based on your logic if needed
                          onChange={ handleAssignCheckboxChange(driver?._id)}
                        />
                      </TableCell>
              )}
                    </TableRow>
                  }
            </TableBody>
          </Table>
        </TableContainer>
      </>
      {/* //  )} */}
      {/* Modal for confirmation */}
      <Modal
        open={openModal}
        onClose={()=> handleModalClose()}
        aria-labelledby="request-driver-modal"
        aria-describedby="request-driver-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            outline: "none",
            minWidth: "300px",
            maxWidth: "80%",
            textAlign: "center",
          }}
        >
          <h2 id="request-driver-modal">Request Driver</h2>
          <p id="request-driver-description">
            Are you sure you want to send a request to{" "}
            {selectedDriver?.username}?
          </p>
          <Button variant="contained" sx={{m:1}} onClick={ handleRequestDriver}>
            Yes
          </Button>
          <Button variant="contained" onClick={() => handleModalClose()}>
            No
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetails;

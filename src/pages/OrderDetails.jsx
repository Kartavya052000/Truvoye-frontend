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
import { Box, Grid, IconButton, InputBase, TextField, Typography } from "@mui/material";
import SenderReceiverInfo from "../components/SenderReceiverInfo ";
import SearchIcon from "@mui/icons-material/Search";
import SortDialog from "../components/SortDialog";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState({});
  const [selectedDriver, setSelectedDriver] = useState({}); // Track selected driver for modal
  const [openModal, setOpenModal] = useState(false); // Modal state
  const { id } = useParams(); // Extract id from URL
  const [selectedSort, setSelectedSort] = useState("latest");
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]); // Fetch details whenever id changes

  let order = [];
  const fetchOrderDetails = async () => {
    const url = "/order/get/" + id;
    post(url)
      .then((response) => {
        console.log(response);
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
    if (order?.order_status == 0) {
      driverurl = "/driver/get?active=false";
    } else {
      // alert(hit)
      driverurl = "/driver/get/" + order?.driver_id?._id;
    }

    post(driverurl)
      .then((response) => {
        if (order)
          if (order?.order_status == 0) {
            setDrivers(response.data);
          } else {
            // alert(hit)
            setDriver(response.data);
          }
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
    console.log(driver, "driver");
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
      username: selectedDriver.username,
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

  const handleOrderStatusSummery = (order) => {
    switch (order?.order_status) {
      case 0:
        return "Driver needs tobe assigned";
      case 1:
        return (
          "Order Assigned Waiting for " +
          order?.driver_info?.username +
          " to pickup "
        );
      case 2:
        return (
          "Order In-Progress " +
          order?.driver_info?.username +
          " has pickup the order"
        );
      case 3:
        return (
          "Completed on " +
          new Date(order?.completed_on).toLocaleDateString() +
          " by " +
          order?.driver_info?.username +
          "," +
          order?.driver_id?._id.slice(-10).toUpperCase()
        );
      default:
        return "N/A";
    }
  };

  const handleSearchChange = (e) => {};
  const handlePrevious = (e) => {};
  const handleNext = (e) => {};
  const onLimitChange = (e) => {};

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ border: "solid 1px #1237BF", p: 1 }}>
            <Typography component="h1" variant="h6">
              Order No : {orderDetails._id}
            </Typography>
          </Box>

          <SenderReceiverInfo
            sx={{ border: "solid 1px #1237BF", mt: 1, mb: 1, p: 1 }}
            senderName={orderDetails?.client_info?.senders_name}
            senderEmail={orderDetails?.client_info?.senders_email}
            receiverName={orderDetails?.client_info?.receivers_name}
            receiverEmail={orderDetails?.client_info?.receivers_email}
          />

          <Box sx={{ border: "solid 1px #1237BF", p: 1 }}>
            <Typography component="h1" variant="h6">
              Order Status :
            </Typography>

            <Typography>{handleOrderStatusSummery(orderDetails)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{ height: "100%", border: "solid 1px #1237BF", pl: 1, pr: 1 }}
          >
            <Typography component="h1" variant="h6" gutterBottom>
              Order Details :
            </Typography>

            <Typography>
              Destination : {orderDetails?.receiver_address?.address_name}
            </Typography>

            <Typography>Weight of Shipment : {orderDetails?.weight}</Typography>

            <Typography>
              Pickup Address : {orderDetails?.pickup_address?.address_name}
            </Typography>

            <Typography>
              Delivery Address : {orderDetails?.receiver_address?.address_name}
            </Typography>

            <Typography>
              Pickup Date :{" "}
              {new Date(
                orderDetails?.pickup_date || "N/A"
              ).toLocaleDateString()}
            </Typography>

            <Typography>
              Duration : {orderDetails?.duration || "Coming soon..."}
            </Typography>

            <Typography>
              Cost: {orderDetails?.cost || "Coming soon..."}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* {drivers && ( */}
      <>
        <Box
          sx={{
            border: "solid 1px #1237BF",
            borderRadius: "10px",
            mt: 2,
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <h1
              className="my-4 text-2xl font-bold"
              style={{ color: "#1237BF", flexGrow: "1" }}
            >
              Drivers
            </h1>
            <Box
              component="form"
              style={{
                display: "flex",
                alignItems: "center",
                width: 400,
                border: "1px solid #1237BF",
                borderRadius: "100px",
              }}
            >
              <InputBase
                onChange={handleSearchChange}
                sx={{
                  ml: 2,
                  flex: 1,
                }}
                placeholder="Search Order"
                inputProps={{ "aria-label": "search order" }}
              />
              <IconButton
                type="button"
                sx={{ color: "black" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Box>

          </Box>
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
                {orderDetails.order_status === 0 ? (
                  drivers.map((driver) => (
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
                ) : (
                  <TableRow key={driver._id}>
                    <TableCell>{driver?.email}</TableCell>
                    <TableCell>{driver?.username}</TableCell>
                    <TableCell>{driver?.phone}</TableCell>
                    <TableCell>{driver?.truckLicensePlateNumber}</TableCell>
                    {orderDetails.order_status === 0 && (
                      <TableCell>
                        <Checkbox
                          checked={false} // Adjust based on your logic if needed
                          onChange={handleAssignCheckboxChange(driver?._id)}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", borderTop: "solid 1px #F9A33F", pt: 2 }}>
            <Button
              variant="contained"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Typography align="center" sx={{ flexGrow: "1" }}>
              Page {currentPage} of {totalPages}
            </Typography>

            <TextField
              type="number"
              size="small"
              defaultValue={limit}
              inputProps={{
                min: 1,
                step: 10,
                style: { maxWidth: "50px" },
              }}
              onChange={onLimitChange}
              variant="outlined"
              sx={{
                mr: 2,
              }}
            />
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Box>
        </Box>
      </>
      {/* //  )} */}
      {/* Modal for confirmation */}
      <Modal
        open={openModal}
        onClose={() => handleModalClose()}
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
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={handleRequestDriver}
          >
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

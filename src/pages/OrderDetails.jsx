import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { post } from "../api/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  Box,
  Grid,
  IconButton,
  InputBase,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SenderReceiverInfo from "../components/SenderReceiverInfo ";
import SearchIcon from "@mui/icons-material/Search";
import SortDialog from "../components/SortDialog";
import { debounce } from "lodash";
import loadingGif from "../Assets/imagesG/TruckAnimationTruvoey.gif";
import MobileOrderDetailsDriverCard from "../components/MobileOrderDetailsDriverCard";
import { padding, textAlign } from "@mui/system";
import Swal from "sweetalert2";

const tableHeadCellStyle = {
  paddingTop: "12px",
  paddingBottom: "12px",
  fontSize: "22px",
  color: "#1237BF",
  fontWeight: "500",
};

const tableBodyCell = { fontSize: "16px", pt: "12px", pb: "12px" };

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState();
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDrivers, setTotalDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMediaQuery("(min-width:600px)");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchOrderDetails(id);
  }, [id]);

  let order = [];
  const fetchOrderDetails = async (id) => {
    const url = "/order/get/" + id;
    post(url)
      .then((response) => {
        console.log(response);
        const orders = response.data;
        setOrderDetails(orders.order);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;

        console.log(response);
      });
  };

  useEffect(() => {
    if(orderDetails && orderDetails.driver_info){
      setIsVisible(false)


    }else{

      const fetchDrivers = async (order) => {
        let param = { query: searchQuery, limit, page: currentPage };
        let apiUrl = "/driver/get/";
        console.log("What is the order status => " + order);
        if (order?.order_status === 0) {
          param.active = true;
        } else {
          apiUrl = "/driver/get/" + order?.driver_id?._id;
        }
  
        setLoading(true);
        // alert("hit1")
  
        post(apiUrl, {}, param)
          .then((response) => {
            if (order)
              if (order?.order_status === 0) {
                // alert("hit2")
                const newDrivers = response.data.drivers;
                setTotalDrivers((prevDrivers) =>
                  prevDrivers.length > 0
                    ? [...prevDrivers, ...newDrivers]
                    : newDrivers
                );
  
                setDrivers(newDrivers);
  
                setTotalPages(Math.ceil(response.data.total / limit));
              } else {
                setDrivers([response.data]);
                setTotalPages(1);
              }
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error submitting data:", error);
            const response = error.response;
  
            console.log(response);
          })
          .finally(() => {
            setLoading(false);
          });
      };
      if (orderDetails) {
        const indexOfFirstRecord = (currentPage - 1) * limit;
        const indexOfLastRecord = indexOfFirstRecord + limit;
        if (totalDrivers.length >= indexOfLastRecord) {
          const currentRecords = totalDrivers.slice(
            indexOfFirstRecord,
            indexOfLastRecord
          );
          setDrivers(currentRecords);
        } else {
          fetchDrivers(orderDetails);
        }
      }
    }

  }, [orderDetails, searchQuery, limit, currentPage]);

  const handleAssignCheckboxChange = (driver) => (event) => {
    // Handle checkbox change logic here
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
    setLoading(true)
    post("/orderDetails/assign-order", data)
      .then((response) => {
        // setSelectedDriver(driver);   //i think this is not required ?
        // window.location.reload();

        Swal.fire({
          title: "Request Successfully sent to driver",
          icon: "success",
          iconColor: "blue",
          showConfirmButton: false,
          customClass: {
            // icon: 'custom-icon',
            title: 'custom-title',
            content: 'custom-content'
          },
          timer: 2000 // close after 2 seconds

        });
        
        const newOrder = response.data.order;
        // console.log(newOrder)
        setOrderDetails(newOrder);



        setIsVisible(false)

        //   setTimeout(()=>{
        //  setLoading(false)
        //  alert("hit")
        //   },2000)
        // alert(loading)
        // setCurrentPage(-1)
        // setOpenModal(true); // Open modal when checkbox is clicked
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;

        console.log(response);
      });
  };

  useEffect(() => {
    if (isMobile) {
      setLimit(8);
      console.log("Limit is set to 8");
    } else {
      setLimit(1000);
    }
  }, [isMobile]);

  const handleOrderStatusSummery = (order) => {
    switch (order?.order_status) {
      case 0:
        return "Driver needs to be assigned";
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
          ", " +
          order?.driver_id?._id.slice(-10).toUpperCase()
        );
      default:
        return "N/A";
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setDrivers([]); // Clear orders when new search is made
      setTotalDrivers([]);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handlePrevious = (e) => {};
  const handleNext = (e) => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const debouncedLimit = useCallback(
    debounce((value) => {
      setLimit(value);
      setCurrentPage(1);
      setDrivers([]); // Clear orders when new limit is set
      setTotalDrivers([]);
    }, 500),
    []
  );

  const onLimitChange = (e) => {
    debouncedLimit(Number(e.target.value));
  };

  function kgToTon(kg, type = "metric") {
    if (typeof kg !== "number" || kg < 0) {
      throw new Error("Invalid input: kg must be a non-negative number");
    }

    const METRIC_TON_CONVERSION = 1000;
    const US_TON_CONVERSION = 907.185;

    if (type === "metric") {
      return kg / METRIC_TON_CONVERSION + " Tons";
    } else if (type === "us") {
      return kg / US_TON_CONVERSION + " Tons";
    } else {
      throw new Error('Invalid type: type must be "metric" or "us"');
    }
  }

  if (!orderDetails) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh", // Adjust this height as per your layout
        }}
      >
        <img style={{ maxWidth: "300px" }} src={loadingGif} alt="Loading..." />
        {/* Alternatively, you can use CircularProgress */}
        {/* <CircularProgress /> */}
      </Box>
    );
  }

  return (
    <Box p={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box sx={{ backgroundColor: "white" }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#1237BF",
                  padding: "12px 24px",
                }}
              >
                Order No : {orderDetails._id.toUpperCase()}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <SenderReceiverInfo
              sx={{ backgroundColor: "white", padding: "10px 24px" }}
              senderName={orderDetails?.client_info?.senders_name}
              senderEmail={orderDetails?.client_info?.senders_email}
              receiverName={orderDetails?.client_info?.receivers_name}
              receiverEmail={orderDetails?.client_info?.receivers_email}
            />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ backgroundColor: "white", padding: "10px 0" }}>
              <Typography
                component="h1"
                sx={{
                  padding: "0 24px",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#1237BF",
                }}
              >
                Order Status :
              </Typography>

              <Typography sx={{ padding: "0 24px", fontSize: "18px" }}>
                {handleOrderStatusSummery(orderDetails)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              backgroundColor: "white",
              padding: "8px 12px",
            }}
          >
            <Typography
              component="h2"
              sx={{ fontSize: "20px", color: "#1237BF", fontWeight: "700" }}
              gutterBottom
            >
              Order Details :
            </Typography>

            <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
              Destination : {orderDetails?.receiver_address?.address_name}
            </Typography>

            <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
              Weight of Shipment : {kgToTon(orderDetails?.weight)}
            </Typography>

            <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
              Pickup Address : {orderDetails?.pickup_address?.address_name}
            </Typography>

            <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
              Delivery Address : {orderDetails?.receiver_address?.address_name}
            </Typography>

            <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
              Pickup Date :{" "}
              {new Date(
                orderDetails?.pickup_date || "N/A"
              ).toLocaleDateString()}
            </Typography>

            <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
              Duration : {orderDetails?.duration || "Coming soon..."}
            </Typography>

            <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
              Cost: { "$"+ orderDetails?.cost +" CAD" || "NA"}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {isVisible &&       <Box
        sx={{
          backgroundColor: {sm:"white"},
          borderRadius: "10px",
          mt: 2,
          p: "1px",
        }}
      >
        <Grid container spacing={2} sx={{ padding: "12px 24px" }}>
          <Grid item xs={12} md={9} alignContent={"center"}>
            <Typography
              className="my-4 text-2xl font-bold "
              variant="h4"
              component="h1"
              sx={{
                textAlign: { xs: "center", sm: "left" },
                color: "#1237BF",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              Available Drivers
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Box
                component="form"
                style={{
                  backgroundColor:"white",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #1237BF",
                  borderRadius: "100px",
                }}
              >
                <InputBase
                  onChange={handleSearchChange}
                  sx={{
                    ml: 2,
                    flex: 1,
                    fontSize: "14px",
                  }}
                  placeholder="Description"
                  inputProps={{ "aria-label": "description" }}
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
          </Grid>
        </Grid>
 
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh", // Adjust this height as per your layout
            }}
          >
            <img
              style={{ maxWidth: "300px" }}
              src={loadingGif}
              alt="Loading..."
            />
            {/* Alternatively, you can use CircularProgress */}
            {/* <CircularProgress /> */}
          </Box>
        ) : isMobile ? (

          <>
            <TableContainer component={Paper}>
              <Table
                aria-label="drivers table"
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                  },
                }}
              >
                <TableHead
                  sx={{
                    borderTop: "1px solid #F9A33F",
                    borderBottom: "1px solid #F9A33F",
                    borderBottomColor: "#F9A33F",
                  }}
                >
                  <TableRow>
                    <TableCell
                      sx={{ ...tableHeadCellStyle, pl: "24px" }}
                      align="left"
                    >
                      Username
                    </TableCell>
                    <TableCell sx={tableHeadCellStyle} align="left">
                      Address
                    </TableCell>
                    <TableCell sx={tableHeadCellStyle} align="left">
                      Email
                    </TableCell>
                    <TableCell sx={tableHeadCellStyle} align="left">
                      Phone
                    </TableCell>
                    <TableCell sx={tableHeadCellStyle} align="left">
                      Truck Plate
                    </TableCell>
                    <TableCell sx={tableHeadCellStyle} align="left">
                      Driver License
                    </TableCell>
                    {orderDetails.order_status === 0 && (
                      <TableCell sx={tableHeadCellStyle} align="center">
                        Assign
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {console.log(drivers)}
                  {drivers.map((driver) => (
                    <TableRow key={driver._id}>
                      <TableCell sx={{ ...tableBodyCell, pl: "24px" }}>
                        {driver.username}
                      </TableCell>
                      <TableCell sx={tableBodyCell}>
                        {driver?.address?.formatted_address || "NA"}
                      </TableCell>
                      <TableCell sx={tableBodyCell}>{driver.email}</TableCell>
                      <TableCell sx={tableBodyCell}>{driver.phone}</TableCell>
                      <TableCell sx={tableBodyCell}>
                        {driver.truckLicensePlateNumber}
                      </TableCell>
                      <TableCell sx={tableBodyCell}>
                        {driver.driverLicense}
                      </TableCell>
                      {orderDetails.order_status === 0 && (
                        <TableCell align="center" sx={tableBodyCell}>
                          <Checkbox
                            checked={false} // Adjust based on your logic if needed
                            onChange={handleAssignCheckboxChange(driver)}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                borderTop: "solid 1px #F9A33F",
                padding: "12px 24px",
              }}
            >
              <Button
                sx={{
                  padding: "0px 42px",
                  textTransform: "none",
                  fontWeight: "400",
                }}
                variant="contained"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Typography
                align="center"
                sx={{
                  flexGrow: "1",
                  fontSize: "20px",
                  color: "#1237BF",
                  fontWeight: "700",
                }}
              >
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
                sx={{
                  padding: "0px 42px",
                  textTransform: "none",
                  fontWeight: "400",
                }}
                variant="outlined"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Box>
          </>
        ) : (
          <>
            {drivers.map((driver) => (
              <MobileOrderDetailsDriverCard
                key={driver._id}
                data={driver}
                orderDetails={orderDetails}
                handleAssignCheckboxChange={handleAssignCheckboxChange}
              />
            ))}
          </>
        )}
      </Box> } 

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
            borderRadius: "10px",
          }}
        >
          <h2 id="request-driver-modal">Assign Driver</h2>
          <p id="request-driver-description">
            Are you sure you want to assign to the driver{" "}
            {selectedDriver?.username}?
          </p>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              m: 1,
              width: "28%",
              backgroundColor: "#1237BF", // Blue background
              color: "white", // White text
              "&:hover": {
                backgroundColor: "#0e2e8c", // Darker blue on hover
              },
              borderRadius: "20px",
            }}
            onClick={handleRequestDriver}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              m: 1,
              borderColor: "#E53E3E", // Red border
              color: "#E53E3E", // Red text
              "&:hover": {
                borderColor: "#C53030", // Darker red on hover
                color: "#C53030", // Darker red text on hover
                backgroundColor: "transparent", // Ensure background stays white on hover
              },
              width: "28%",
              borderRadius: "20px",
            }}
            onClick={handleModalClose}
          >
            No
          </Button>
        </div>
      </Modal>
    </Box>
  );
};

export default OrderDetails;

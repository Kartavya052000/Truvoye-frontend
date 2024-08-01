import React, { useState, useEffect, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import { post } from "../api/api";
import drivers from "../Assets/imagesV/Truck.svg"; // Import Link from React Router
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  TextField,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import loadingGif from "../Assets/imagesG/TruckAnimationTruvoey.gif";
import MobileTrackingCard from "../components/MobileTrackingCard";
import ChoiceDialog from "../components/ChoiceDialog";

const tableHeadCellStyle = {
  paddingTop: "12px",
  paddingBottom: "12px",
  fontSize: "22px",
  color: "#1237BF",
  fontWeight: "500",
};

const tableBodyCell = { fontSize: "16px", pt: "12px", pb: "12px" };

const linkStyle = {
  color: "#939393",
  fontFamily: "Outfit",
  fontSize: "18px",
  fontWeight: "400",
  textDecorationLine: "underline",
};

const choiceOptions = ["Share Link", "Real-time Tracking"];

const Tracking = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalOrders, setTotalOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(2);
  const isMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await post(
          "/order/get",
          {},
          { query: searchQuery, limit, page: currentPage, status: orderStatus }
        );

        console.log(response);

        const newOrders = response.data.orders;

        setTotalOrders((prevOrders) =>
          prevOrders.length > 0 ? [...prevOrders, ...newOrders] : newOrders
        );

        setOrders(newOrders);

        setTotalPages(Math.ceil(response.data.total / limit));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    const indexOfFirstRecord = (currentPage - 1) * limit;
    const indexOfLastRecord = indexOfFirstRecord + limit;
    if (totalOrders.length >= indexOfLastRecord) {
      const currentRecords = totalOrders.slice(
        indexOfFirstRecord,
        indexOfLastRecord
      );
      setOrders(currentRecords);
    } else {
      fetchOrders();
    }
  }, [currentPage, limit, orderStatus, searchQuery]);

  const getInitials = (name) => {
    const parts = name.split(" ");
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  const TrackRoute = (order) => {
    console.log(order.order_status);
    if (order.order_status === 2) {
      navigate(`/dashboard/order-tracking/${order._id}`);
    } else {
      setAlertMessage(["error", "Order is not picked up yet"]);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setOrders([]); // Clear orders when new search is made
      setTotalOrders([]);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const debouncedLimit = useCallback(
    debounce((value) => {
      setLimit(value);
      setCurrentPage(1);
      setOrders([]); // Clear orders when new limit is set
      setTotalOrders([]);
    }, 500),
    []
  );

  const onLimitChange = (event) => {
    debouncedLimit(Number(event.target.value));
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  function formatDateString(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${year}/${month}/${day} at ${hours}:${minutes} ${ampm}`;
  }

  const onOptionSelected = (option, orderId) => {
    if (option === "Real-time Tracking") {
      navigate(`/dashboard/order-tracking/${orderId}`);
    } else if (option === "Share Link") {
      alert("Stay Tune Coming soon ");
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px 24px",
          width: { xs: "100%", sm: "100%", md: "60%", lg: "70%" },
          backgroundColor:{sm:"white"},
          borderTopRightRadius:{sm:"20px"},
          borderTopLeftRadius:{sm:"20px"}
        }}
      >
        <Typography
          className="my-4 text-2xl font-bold "
          variant="h4"
          component="h1"
          sx={{
            color: "#1237BF",
            fontSize: "24px",
            fontWeight: "700",
            flexGrow: 1,
            textAlign: { xs: "center", sm: "left" },
            display: { xs: "none", sm: "block" },
          }}
        >
          Order Tracking
        </Typography>
        <Box
          component="form"
          style={{
            flexGrow: "1",
            display: "flex",
            alignItems: "center",
            border: "1px solid #1237BF",
            borderRadius: "100px",
            backgroundColor:"white"
          }}
        >
          <InputBase
            onChange={handleSearchChange}
            sx={{
              ml: 2,
              flex: 1,
              fontSize: "14px",
            }}
            placeholder="Search Order"
            inputProps={{ "aria-label": "search order" }}
          />
          <IconButton type="button" sx={{ color: "black" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh", // Adjust this height as per your layout
            width: { xs: "100%", sm: "100%", md: "60%", lg: "70%" },
            backgroundColor:"white",
            borderBottomRightRadius:{sm:"20px"},
            borderBottomLeftRadius:{sm:"20px"}
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
          <Box sx={{ width: { xs: "100%", sm: "100%", md: "60%", lg: "70%" }, backgroundColor:"white", borderRadius:"20px"} }>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                  },
                }}
                aria-label="order table"
              >
                <TableHead
                  className="drivers-tablehead"
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
                      Order ID
                    </TableCell>
                    <TableCell sx={tableHeadCellStyle}>Pickup Date</TableCell>
                    <TableCell sx={tableHeadCellStyle}>Tracking Link</TableCell>
                    <TableCell sx={tableHeadCellStyle} align="center">
                      Option
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell sx={{ ...tableBodyCell, pl: "24px" }}>
                        {order._id.substring(0, 10).toUpperCase()}
                      </TableCell>
                      <TableCell sx={tableBodyCell}>
                        {formatDateString(order.pickup_date)}
                      </TableCell>
                      <TableCell sx={tableBodyCell}>
                        <Link
                          to={`/dashboard/order-tracking/${order._id}`}
                          style={linkStyle}
                        >
                          trackinglink
                        </Link>
                      </TableCell>
                      <TableCell
                        sx={tableBodyCell}
                        style={{ cursor: "pointer" }}
                        align="center"
                      >
                        {
                          <ChoiceDialog
                            options={choiceOptions}
                            onChange={(choice) => {
                              onOptionSelected(choice, order._id);
                            }}
                          />
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <AlertMessage alertMessage={alertMessage} />
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
                variant="contained"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box sx={{ mt: 1 }}>
          {orders.map((order) => (
            <MobileTrackingCard key={order._id} data={order} />
          ))}
        </Box>
      )}
    </div>
  );
};

export default Tracking;

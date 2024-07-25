import React, { useState, useEffect, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
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
  const [orderStatus, setOrderStatus] = useState(null);
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

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 3 }}>
        <Typography
          className="my-4 text-2xl font-bold "
          variant="h4"
          component="h1"
          sx={{
            flexGrow: 1,
            color: "#1237BF",
            paddingLeft: 1,
            paddingRight: 1,
            textAlign: { xs: "center", sm: "left" },
            display: { xs: "none", sm: "block" },
            fontWeight:"600"
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
            <Table sx={{ minWidth: 650 }} aria-label="order table">
              <TableHead
                className="drivers-tablehead"
                sx={{
                  borderBottomColor: "#F9A33F",
                  border: "1px solid #F9A33F",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      borderBottomColor: "#F9A33F",
                      fontWeight: "bold",
                    }}
                  >
                    Order ID
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                    align="right"
                  >
                    Pickup Address
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                    align="right"
                  >
                    Receiver Address
                  </TableCell>
                  {/* <TableCell align="right">Weight</TableCell> */}
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                    align="right"
                  >
                    Pickup Date
                  </TableCell>
                  {/* <TableCell align="right">Status</TableCell> */}
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                    align="right"
                  >
                    Tracking Link
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell component="th" scope="row">
                      {order._id.substring(0, 10).toUpperCase()}
                    </TableCell>
                    <TableCell align="right">
                      {order.pickup_address?.address_name}
                    </TableCell>
                    <TableCell align="right">
                      {order.receiver_address?.address_name}
                    </TableCell>
                    {/* <TableCell align="right">{order.weight}</TableCell> */}
                    <TableCell align="right">
                      {new Date(order.pickup_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {!order?.driver_id ? "Unassigned" : "Assigned"}
                    </TableCell>
                    <TableCell align="right" style={{ cursor: "pointer" }}>
                      {order.order_status === 2 ? (
                        <Link to={`/dashboard/order-tracking/${order._id}`}>
                          <Avatar sx={{ bgcolor: blue[500] }}>&gt;</Avatar>
                        </Link>
                      ) : (
                        <Avatar
                          sx={{ bgcolor: blue[100] }}
                          onClick={() =>
                            setAlertMessage([
                              "error",
                              "Order is not picked up yet",
                            ])
                          }
                        >
                          &gt;
                        </Avatar>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <AlertMessage alertMessage={alertMessage} />
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
        </>
      ) : (
        <Box sx={{ mt: 1 }}>
          {orders.map((order) => (
            <MobileTrackingCard
              key={order._id}
              data={order} 
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default Tracking;

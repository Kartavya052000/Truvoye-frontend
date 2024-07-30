import React, { useState, useEffect, useCallback, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { post } from "../api/api";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Icon,
  IconButton,
  InputBase,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import StatusBadge from "../components/StatusBadge";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import details from "../Assets/imagesV/Details.svg";
import loadingGif from "../Assets/imagesG/TruckAnimationTruvoey.gif";
import SortDialog from "../components/SortDialog";
import MobileOrderCard from "../components/MobileOrderCard";
import InfiniteScroll from "react-infinite-scroll-component";
import filter from "../Assets/imagesV/filter.svg"

const filterIcon = (
  <Icon>
    <img alt="filter" src={filter} />
  </Icon>
);

const sortOptions = [
  { value: "latest", label: "Latest Order" },
  { value: "unassigned", label: "Unassigned" },
  { value: "assigned", label: "Assigned" },
  { value: "inProgress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalOrders, setTotalOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  const isMobile = useMediaQuery("(min-width:600px)");
  const [dataLength, setDataLength] = useState(0);

  const [selectedSort, setSelectedSort] = useState("latest");

  const handleSortChange = (newSort) => {
    setSelectedSort(newSort);
    console.log(newSort);

    setCurrentPage(1);
    setOrders([]); // Clear orders when new limit is set
    setTotalOrders([]);

    switch (newSort) {
      case "unassigned":
        setOrderStatus(0);
        break;
      case "assigned":
        setOrderStatus(1);
        break;
      case "inProgress":
        setOrderStatus(2);
        break;
      case "completed":
        setOrderStatus(3);
        break;
      default:
        setOrderStatus(null);
    }
  };

  const fetchOrders = useCallback(
    async (searchQuery = "", currentPage = 1, orderStatus) => {
      console.log(
        "what is current page : " +
          currentPage +
          " what is search query " +
          searchQuery +
          "and what is limit" +
          limit +
          " What is status " +
          orderStatus
      );
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

        setDataLength(response.data.total);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    const indexOfFirstRecord = (currentPage - 1) * limit;
    const indexOfLastRecord = indexOfFirstRecord + limit;
    if (totalOrders.length >= indexOfLastRecord) {
      const currentRecords = totalOrders.slice(
        indexOfFirstRecord,
        indexOfLastRecord
      );
      setOrders(currentRecords);
    } else {
      fetchOrders(searchQuery, currentPage, orderStatus);
    }
  }, [searchQuery, limit, currentPage, orderStatus, fetchOrders]);

  useEffect(() => {
    if (isMobile) {
      setLimit(8);
      console.log("Limit is set to 8");
    } else {
      setLimit(8);
    }
  }, [isMobile]);

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
    console.log(
      "I have been summon from the infinite scroll current page " + currentPage
    );
    if (currentPage < totalPages) {
      console.log("Are this condition is mate : currentPage < totalPages");
      setCurrentPage((prevPage) => prevPage + 1);
    }
    console.log("After increment  " + currentPage);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const memoizedTableRows = useMemo(
    () =>
      orders.map((order) => (
        <TableRow key={order._id}>
          <TableCell component="th" scope="row" sx={{paddingLeft:"24px", fontSize:"16px", pt:"12px", pb:"12px"}}>
            {order._id.slice(-10).toUpperCase()}
          </TableCell>
          <TableCell align="left" sx={{fontSize:"16px", pt:"12px", pb:"12px"}}>
            <StatusBadge status={order.order_status}></StatusBadge>
          </TableCell>
          <TableCell align="left" sx={{fontSize:"16px", pt:"12px", pb:"12px"}}>
            {!order?.driver_info
              ? "None"
              : order?.driver_info?.username || "None"}
          </TableCell>
          <TableCell align="left" sx={{fontSize:"16px", pt:"12px", pb:"12px"}}>
            {new Date(order.pickup_date).toLocaleDateString()}
          </TableCell>
          <TableCell align="left" sx={{fontSize:"16px", pt:"12px", pb:"12px"}}>
            {order.receiver_address?.address_name}
          </TableCell>
          <TableCell align="center" sx={{fontSize:"16px", pt:"12px", pb:"12px"}}>
            <Link to={`/dashboard/order-details/${order._id}`}>
              <img className="details" src={details} alt="details-icon" />
            </Link>
          </TableCell>
        </TableRow>
      )),
    [orders]
  );

  return (
    <div id="scrollableDiv" style={{ height: "100%", overflow: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", padding: "12px 24px" }}>
        <Typography
          component="h1"
          className="my-4 text-2xl font-bold tableTitle"
          style={{
            color: "#1237BF",
            flexGrow: "3",
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Orders
        </Typography>

        <Box
          component="form"
          style={{
            flexGrow: "1",
            display: "flex",
            alignItems: "center",
            border: "1px solid #1237BF",
            borderRadius: "100px",
            background: "white",
            padding: "4px 8px"
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
          <IconButton
            type="button"
            sx={{ color: "black", width: "20.373px", height: "21px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Box>

        <SortDialog
        iconSX={{width: "22px",
          height: "20px"}}
          options={sortOptions}
          selectedValue={selectedSort}
          onChange={handleSortChange}
          // icon={filterIcon}
          // icon={<Icon> <img src={filter} alt="filter order" /> </Icon>}
        />
      </Box>

      {/* {isMobile ? (loading ? (<Box>loading</Box>) : (<Box>Desktop</Box>)) : (<Box>Mobile</Box>)} */}

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
              aria-label="order table"
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: "none",
                },
              }}
            >
              <TableHead
                sx={{
                  borderBottomColor: "#F9A33F",
                  borderTop: "1px solid #F9A33F",
                  borderBottom: "1px solid #F9A33F",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      paddingTop:"12px",
                      paddingBottom:"12px",
                      fontSize: "22px",
                      color: "#1237BF",
                      fontWeight: "500",
                      paddingLeft:"24px"
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingTop:"12px",
                      paddingBottom:"12px",
                      fontSize: "22px",
                      color: "#1237BF",
                      fontWeight: "500",
                    }}
                    align="left"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingTop:"12px",
                      paddingBottom:"12px",
                      fontSize: "22px",
                      color: "#1237BF",
                      fontWeight: "500",
                    }}
                    align="left"
                  >
                    Assigned Driver
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingTop:"12px",
                      paddingBottom:"12px",
                      fontSize: "22px",
                      color: "#1237BF",
                      fontWeight: "500",
                    }}
                    align="left"
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingTop:"12px",
                      paddingBottom:"12px",
                      fontSize: "22px",
                      color: "#1237BF",
                      fontWeight: "500",
                    }}
                    align="left"
                  >
                    Destination
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingTop:"12px",
                      paddingBottom:"12px",
                      fontSize: "22px",
                      color: "#1237BF",
                      fontWeight: "500",
                    }}
                    align="center"
                  >
                    Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{memoizedTableRows}</TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", borderTop: "solid 1px #F9A33F", padding:"12px 24px"}}>
            <Button
            sx={{padding:"0px 42px", textTransform: "none", fontWeight:"400" }}
              variant="contained"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Typography align="center" sx={{ flexGrow: "1", fontSize:"20px", color:"#1237BF", fontWeight:"700" }}>
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
              sx={{padding:"0px 42px", textTransform: "none", fontWeight:"400" }}
              variant="outlined"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Box>
        </>
      ) : (
        <InfiniteScroll
          style={{ padding: "1rem" }}
          dataLength={dataLength}
          next={handleNext}
          hasMore={!(currentPage === totalPages)}
          loader={<h4>Loading...</h4>}
          scrollableTarget={"scrollableDiv"}
        >
          {totalOrders.map((order) => (
            <MobileOrderCard key={order._id} data={order} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};
export default Order;

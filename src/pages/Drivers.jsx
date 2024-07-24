//correct: version :2
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  InputBase,
  IconButton,
  TextField,
  Fab,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../api/api";
import "../styles/Drivers.css";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import ChoiceDialog from "../components/ChoiceDialog";
import loadingGif from "../Assets/imagesG/TruckAnimationTruvoey.gif";
import AddIcon from "@mui/icons-material/Add";
import MobileDriverCard from "../components/MobileDriverCard";
import plus from '../Assets/imagesV/add.svg';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDrivers, setTotalDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const fetchDrivers = async () => {
      let param = { query: searchQuery, limit, page: currentPage };
      setLoading(true);
      post("/driver/get/", {}, param)
        .then((response) => {
          console.log(response);
          const newDrivers = response.data.drivers;
          setTotalDrivers((prevDrivers) =>
            prevDrivers.length > 0
              ? [...prevDrivers, ...newDrivers]
              : newDrivers
          );

          setDrivers(newDrivers);

          setTotalPages(Math.ceil(response.data.total / limit));
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

    const indexOfFirstRecord = (currentPage - 1) * limit;
    const indexOfLastRecord = indexOfFirstRecord + limit;
    if (totalDrivers.length >= indexOfLastRecord) {
      const currentRecords = totalDrivers.slice(
        indexOfFirstRecord,
        indexOfLastRecord
      );
      setDrivers(currentRecords);
    } else {
      fetchDrivers();
    }
  }, [searchQuery, limit, currentPage]);

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

  const onOptionSelected = (option, driverId) => {
    alert("what is selected option : " + option + " Driver id : " + driverId);
    if (option === "edit") {
      navigate(`/dashboard/edit-driver/${driverId} `);
    } else if (option === "deactivate") {
    }
  };

  const choiceOptions = ["edit", "Deactivate"];

  return (
    <Box>
      <Fab
        sx={{
          display: { sm: "none" },
          position: "absolute",
          bottom: 0,
          right: 0,
          margin: 2,
        }}
        color="primary"
        aria-label="add"
        component={Link}
        to="/dashboard/add-driver"
      >
        <AddIcon />
      </Fab>
      {/* md={6} */}

      <Grid container sx={{ pb: 2 }}>
        <Grid item xs={4} sx={{ display: { xs: "none", sm: "initial" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%", // Optional, ensures the Box takes the full height of the parent
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: "left", color: "#1237BF" }}
            >
              Drivers
            </Typography>
          </Box>
        </Grid>
        <Grid Item xs={12} sm={4}>
          <Box
            component="form"
            style={{
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
              placeholder="Search Driver"
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
        </Grid>

        <Grid item xs={4} sx={{ display: { xs: "none", sm: "initial" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              height: "100%",
              alignItems: "center",
              pr: 2,
              pl: 2,
            }}
          >
            <Button
              size="large"
              sx={{
                background: "#1237BF",
                color: "white",
              }}
              variant="contained"
              component={Link}
              to="/dashboard/add-driver"
            >
               <img src={plus} alt="plus" style={{ width: '10%', height: '10%', margin: '5px' }} />
              Add Driver
            </Button>
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
            <Table aria-label="drivers table">
              <TableHead
                className="drivers-tablehead"
                sx={{
                  borderBottomColor: "#F9A33F",
                  border: "1px solid #F9A33F",
                }}
              >
                <TableRow class>
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                  >
                    Address
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                  >
                    Truck Plate
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                  >
                    Driver License
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#1237BF",
                      fontWeight: "bold",
                      borderBottomColor: "#F9A33F",
                    }}
                  >
                    Options
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver._id}>
                    <TableCell>{driver.username}</TableCell>
                    <TableCell>
                      {driver.address.formatted_address.substring(0, 20)}
                    </TableCell>
                    <TableCell>{driver.email}</TableCell>
                    <TableCell>{driver.phone}</TableCell>
                    <TableCell>{driver.truckLicensePlateNumber}</TableCell>
                    <TableCell>{driver.driverLicense}</TableCell>
                    <TableCell>
                      <ChoiceDialog
                        options={choiceOptions}
                        onChange={(choice) => {
                          onOptionSelected(choice, driver?._id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
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
        </>
      ) : (
        drivers.map((driver) => (
          <MobileDriverCard
            key={driver._id}
            data={driver}
            onOptionSelected={onOptionSelected}
          />
        ))
      )}
    </Box>
  );
};

export default Drivers;

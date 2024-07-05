import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import JobSheetOrderList from "../../components/JobSheetOrderList";
import Button from "@mui/material/Button";
import { createTheme, styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { post } from "../../api/api";
import AlertMessage from "../../components/AlertMessage";
import { Alert } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } else {
    return "NA";
  }
};

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState({});
  const [currentOrders, setCurrentOrders] = React.useState([]);
  const [upcomingOrders, setUpcomingOrders] = React.useState([]);
  const [completedOrders, setCompletedOrders] = React.useState([]);
  const [alertMessage, setAlertMessage] = React.useState([]);

  // TODO :  GET ME THE DRIVER ID FROM LOGIN HERE
  const driverId = "667a44273149776a7412a59e";

  React.useEffect(() => {
    post(`driver/getOrders?driverId=${driverId}&orderStatus=2`)
      .then((response) => {
        if (response.status === 201) {
          setCurrentOrders(response.data.orders);
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;
        console.log("MAYDAY! MAYDAY! MAYDAYYY!!!!");
        console.log(response);
      });
  }, [driverId]);

  React.useEffect(() => {
    post(`driver/getOrders?driverId=${driverId}&orderStatus=1`)
      .then((response) => {
        if (response.status === 201) {
          setUpcomingOrders(response.data.orders);
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;
        console.log("MAYDAY! MAYDAY! MAYDAYYY!!!!");
        console.log(response);
      });
  }, [driverId]);

  React.useEffect(() => {
    post(`driver/getOrders?driverId=${driverId}&orderStatus=3`)
      .then((response) => {
        if (response.status === 201) {
          setCompletedOrders(response.data.orders);
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;
        console.log("MAYDAY! MAYDAY! MAYDAYYY!!!!");
        console.log(response);
      });
  }, [driverId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onOrderButtonClick = (orderDetails) => {
    setOrderDetails(orderDetails);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const onOrderDetailsDialogAction = () => {
    switch (orderDetails.order_status) {
      case 0:
        console.log(
          'The status of the order is "0 - unassigned" this order doesn\'t belong here '
        );
        break;
      case 1:
        post(`driver/updateOrder?orderId=${orderDetails._id}`, {
          orderStatus: 2,
        })
          .then((response) => {
            if (response.status === 201) {
              console.log(response);
              //Remove order
              setUpcomingOrders((prevUpcomingOrders) =>
                prevUpcomingOrders.filter(
                  (order) => order._id !== orderDetails._id
                )
              );

              // Update orderDetails - just in case
              // const updatedOrderDetails = { ...orderDetails, order_status: 1 };
              setCurrentOrders((prevCurrentOrders) => [
                ...prevCurrentOrders,
                response.data.order,
              ]);

              setAlertMessage([
                "success",
                "Order tracking started successfully",
              ]);
            }
          })
          .catch((error) => {
            console.log("MAYDAY! MAYDAY! MAYDAYYY!!!!");
            console.error("Error updating order status:", error);
            setAlertMessage(["error", "Something Went Wrong contact support"]);
          });

        // assigned
        // TODO : change status of the order to  2 - progress = Driver is on the way to pickup
        // TODO : send an feedback that started successful
        break;
      case 2:
        post(`driver/generateOTP?orderId=${orderDetails._id}`)
          .then((response) => {
            if (response.status === 201) {
              console.log(response);

              setAlertMessage([
                "success",
                "OTP sent to recipient successfully",
              ]);

              setTimeout(() => {
                navigate(`otp-verification/${orderDetails._id}`);
              }, 2000);

              // //Remove order
              // setCurrentOrders((prevCurrentOrders) =>
              //   prevCurrentOrders.filter(
              //     (order) => order._id !== orderDetails._id
              //   )
              // );

              // // Update orderDetails - just in case
              // const updatedOrderDetails = { ...orderDetails, order_status: 3 };
              // setCurrentOrders((prevCurrentOrders) => [
              //   ...prevCurrentOrders,
              //   response.data.order,
              // ]);
            }
          })
          .catch((error) => {
            console.log("MAYDAY! MAYDAY! MAYDAYYY!!!!");
            console.error("Error updating order status:", error);
            setAlertMessage(["error", "Something Went Wrong contact support"]);
          });

        break;
      default:
        console.log("MAY DAY! MAY DAY!!!!! NO VALID STATUS OF THE ORDER FOUND");
    }
    setOpen(false);
  };

  const customTheme = createTheme({
    palette: {
      secondary: {
        main: "#5973D2", // Change this to your desired secondary color
      },
    },
  });

  return (
    <div>
      <AlertMessage alertMessage={alertMessage} />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Order Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography variant="subtitle1" component="h2">
            <b>Order ID:</b> {orderDetails._id}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            <b>Sender Name:</b> {orderDetails?.client?.senders_name ?? "NA"}
          </Typography>
          <Typography variant="subtitle1" component="h2" gutterBottom mb={4}>
            <b>Receiver Name:</b> {orderDetails?.client?.receivers_name ?? "NA"}
          </Typography>

          <Typography variant="subtitle1" component="h2">
            <b>Destination:</b> {orderDetails.receiver_address}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            <b>Duration:</b> {orderDetails?.duration ?? "NA"}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            <b>Pickup Date:</b>{" "}
            {new Date(orderDetails.pickup_date).toLocaleString()}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            <b>Weight of Shipment:</b> {orderDetails.weight} KG
          </Typography>
          <Typography variant="subtitle1" component="h2">
            <b>Pickup Address:</b> {orderDetails.pickup_address}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            <b>Delivery Address:</b> {orderDetails.receiver_address}
          </Typography>

          {orderDetails.order_status === 3 && (
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ width: "100%", textAlign: "center", pt: 4, pb: 4 }}
            >
              <b>
                {" "}
                Completed delivery on{" "}
                {formatDate(orderDetails?.completed_on ?? undefined)}
              </b>
            </Typography>
          )}
        </DialogContent>

        {orderDetails.order_status !== 3 && (
          <DialogActions>
            <Button
              autoFocus
              onClick={onOrderDetailsDialogAction}
              variant="contained"
            >
              {orderDetails.order_status === 1 ? "Start Order" : "Verify OTP"}
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>

      <Box sx={{ width: "100%", height: "90vh" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            textColor="#5973D2"
            indicatorColor="#5973D2"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#5973D2",
              },
            }}
            aria-label="basic tabs example"
          >
            <Tab label="Current" {...a11yProps(0)} />
            <Tab label="Upcoming" {...a11yProps(1)} />
            <Tab label="Completed" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <JobSheetOrderList
            data={currentOrders}
            onOrderButtonClick={onOrderButtonClick}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <JobSheetOrderList
            data={upcomingOrders}
            onOrderButtonClick={onOrderButtonClick}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <JobSheetOrderList
            data={completedOrders}
            onOrderButtonClick={onOrderButtonClick}
          />
        </CustomTabPanel>
      </Box>
    </div>
  );
}

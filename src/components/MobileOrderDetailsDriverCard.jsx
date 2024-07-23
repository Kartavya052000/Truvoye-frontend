import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import details from "../Assets/imagesV/Details.svg";

const MobileOrderDetailsDriverCard = ({ data ,orderDetails, handleAssignCheckboxChange}) => {
  const truncateStart = (str, maxLength) => {
    if (str.length > maxLength) {
      return `${str.substring(str.length - maxLength).toUpperCase()}`;
    } else {
      return str;
    }
  };

  const getOrderStatus = (orderStatus) => {
    switch (orderStatus) {
      case 0:
        return "Un Assigned";
      case 1:
        return "Assigned";
      case 2:
        return "In Progress";
      case 3:
        return "Completed";
      default:
        return "No Status";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will output just the date part
  };
  // sx={{border : "solid" ,mb:3, borderRadius: "30px" , cursor: "pointer"}}  onClick={() => onOrderButtonClick(data.id)}
  return (
    <div className="job-sheet-order">
      <Paper
        elevation={3}
        square={false}
        sx={{  mb: 2, borderRadius: "16px", cursor: "pointer" }}
        onClick={handleAssignCheckboxChange(data)}
      >
        <Grid container>
          <Grid item xs={9}>
            <Box sx={{ pl: 2, pt: 1, pb: 1 }}>

              <Typography
                variant="subtitle1"
                component="h2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <b
                  style={{
                    fontWeight: "bold",
                    color: "#1237BF",
                    fontSize: 16,
                    fontFamily: "Outfit",
                  }}
                >
                  Name :{" "}
                </b>
                <span
                  style={{
                    color: "#000000",
                    fontSize: 14,
                    fontFamily: "Outfit",
                    fontWeight: 500,
                    wordWrap: "break-word",
                  }}
                >
                  {data.username}
                </span>
              </Typography>

              <Typography variant="subtitle1" component="h2">
                <b
                  style={{
                    fontWeight: "bold", // Make the text bold
                    color: "#1237BF", // Set the text color
                    fontSize: 16, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                  }}
                >
                  Address :{" "}
                </b>
                <span
                  style={{
                    color: "#000000", // Set the text color
                    fontSize: 14, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                    fontWeight: 500, // Set font weight (Note: Use numeric value for inline styles)
                    wordWrap: "break-word", // Allow word wrapping
                  }}
                >
                  {data.address.formatted_address}
                </span>
              </Typography>

              <Typography
                variant="subtitle1"
                component="h2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <b
                  style={{
                    fontWeight: "bold", // Make the text bold
                    color: "#1237BF", // Set the text color
                    fontSize: 16, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                  }}
                >
                  Email : {" "}
                </b>
                <span
                  style={{
                    color: "#000000", // Set the text color
                    fontSize: 14, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                    fontWeight: 500, // Set font weight (Note: Use numeric value for inline styles)
                    wordWrap: "break-word", // Allow word wrapping
                  }}
                >
                  {data.email}
                </span>
              </Typography>

              <Typography
                variant="subtitle1"
                component="h2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <b
                  style={{
                    fontWeight: "bold", // Make the text bold
                    color: "#1237BF", // Set the text color
                    fontSize: 16, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                  }}
                >
                  Phone : {" "}
                </b>
                <span
                  style={{
                    color: "#000000", // Set the text color
                    fontSize: 14, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                    fontWeight: 500, // Set font weight (Note: Use numeric value for inline styles)
                    wordWrap: "break-word", // Allow word wrapping
                  }}
                >
                  {data.phone}
                </span>
              </Typography>

              <Typography
                variant="subtitle1"
                component="h2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <b
                  style={{
                    fontWeight: "bold", // Make the text bold
                    color: "#1237BF", // Set the text color
                    fontSize: 16, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                  }}
                >
                  Truck Plate : {" "}
                </b>
                <span
                  style={{
                    color: "#000000", // Set the text color
                    fontSize: 14, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                    fontWeight: 500, // Set font weight (Note: Use numeric value for inline styles)
                    wordWrap: "break-word", // Allow word wrapping
                  }}
                >
                  {data.truckLicensePlateNumber}
                </span>
              </Typography>

              <Typography
                variant="subtitle1"
                component="h2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <b
                  style={{
                    fontWeight: "bold", // Make the text bold
                    color: "#1237BF", // Set the text color
                    fontSize: 16, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                  }}
                >
                  Driver License : {" "}
                </b>
                <span
                  style={{
                    color: "#000000", // Set the text color
                    fontSize: 14, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                    fontWeight: 500, // Set font weight (Note: Use numeric value for inline styles)
                    wordWrap: "break-word", // Allow word wrapping
                  }}
                >
                  {data.driverLicense}
                </span>
              </Typography>

            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              p:2
            //   justifyContent: "center",
            }}
          >
                      {orderDetails.order_status === 0 && (
                        <Button variant="outlined" onClick={handleAssignCheckboxChange(data)}>Assign</Button>

)}

          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MobileOrderDetailsDriverCard;

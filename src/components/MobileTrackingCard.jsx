import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import details from "../Assets/imagesV/Details.svg";
import { blue, green, red } from "@mui/material/colors";

const MobileTrackingCard = ({ data }) => {
  const navigate = useNavigate();

  const truncateStart = (str, maxLength) => {
    if (str.length > maxLength) {
      return `${str.substring(str.length - maxLength).toUpperCase()}`;
    } else {
      return str;
    }
  };

  function formatDateString(dateString) {
    const date = new Date(dateString);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strHours = String(hours).padStart(2, "0");

    return `${month}/${day}/${year} ${strHours}:${minutes} ${ampm}`;
  }

  // sx={{border : "solid" ,mb:3, borderRadius: "30px" , cursor: "pointer"}}  onClick={() => onOrderButtonClick(data.id)}
  return (
    <div className="job-sheet-order">
      <Paper
        elevation={3}
        square={false}
        sx={{ mb: 2, borderRadius: "16px", cursor: "pointer" }}
      >
        <Grid container>
          <Grid item xs={10}>
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
                  OrderID :{" "}
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
                  {truncateStart(data._id, 10)}
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
                  Start Journey :{" "}
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
                  {formatDateString(data.pickup_date)}
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
                  Tracking Link :{" "}
                </b>
                <span
                  style={{
                    color: "#F9A33F", // Set the text color
                    fontSize: 14, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                    fontWeight: 500, // Set font weight (Note: Use numeric value for inline styles)
                    wordWrap: "break-word", // Allow word wrapping
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    alert("This is a Future feature, Coming Soon");
                  }}
                >
                  Share Link
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data.order_status === 2 ? (
              <Link to={`/dashboard/order-tracking/${data._id}`}>
                <Avatar sx={{ bgcolor: "#1237BF" }}>&gt;</Avatar>
              </Link>
            ) : (
              <Avatar
                sx={{ bgcolor: "#D24A4A" }}
                onClick={() => {
                  console.log("Not assigned yet");
                }}
              >
                &gt;
              </Avatar>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MobileTrackingCard;

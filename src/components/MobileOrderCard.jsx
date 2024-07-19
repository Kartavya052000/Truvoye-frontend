import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import details from "../Assets/imagesV/Details.svg";

const MobileOrderCard = ({ data }) => {
  const navigate = useNavigate();

  const truncateStart = (str, maxLength) => {
    if (!str) return;
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
        onClick={() => {

          navigate(`/dashboard/order-details/${data?._id}`);
        }}
      >
        <Grid container>
          <Grid item xs={10}>
            <Box sx={{ pl: 2, pt: 1, pb: 1 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#1237BF",
                  fontSize: 18,
                  fontFamily: "Outfit",
                  fontWeight: 700,
                  wordWrap: "break-word",
                }}
              >
                <b>Order ID : </b>
                <span
                  style={{
                    color: "#000000",
                  }}
                >
                  {truncateStart(data?._id, 8)}
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
                    fontWeight: "bold",
                    color: "#1237BF",
                    fontSize: 16,
                    fontFamily: "Outfit",
                  }}
                >
                  Order Status :{" "}
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
                  {getOrderStatus(data?.order_status)}
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
                  Order Date :{" "}
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
                  {formatDate(data?.created_at)}
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
                  Destination : {" "}
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
                  {data?.receiver_address?.address_name}
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
            <Link to={`/dashboard/order-details/${data?._id}`}>
              <img className="details" src={details} alt="details-icon" />
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MobileOrderCard;

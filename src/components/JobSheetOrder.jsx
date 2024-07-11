import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import React from "react";

const JobSheetOrder = ({ data, onOrderButtonClick }) => {
  const truncateStart = (str, maxLength) => {
    if (str.length > maxLength) {
      return `...${str.substring(str.length - maxLength)}`;
    } else {
      return str;
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
        sx={{ m: 1, mb: 3, borderRadius: "16px", cursor: "pointer" }}
        onClick={() => onOrderButtonClick(data)}
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
                <b>Order ID: {truncateStart(data._id, 5)}</b>
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
                  Pickup Date:
                </b>
                <span
                  style={{
                    color: "#1237BF", // Set the text color
                    fontSize: 14, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                    fontWeight: 400, // Set font weight (Note: Use numeric value for inline styles)
                    wordWrap: "break-word", // Allow word wrapping
                  }}
                >
                  {formatDate(data.pickup_date)}
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
                <b style={{
                    fontWeight: "bold", // Make the text bold
                    color: "#1237BF", // Set the text color
                    fontSize: 16, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                  }}
                >Weight of Shipment:</b> 
                   <span
                  style={{
                    color: "#1237BF", // Set the text color
                    fontSize: 14, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                    fontWeight: 400, // Set font weight (Note: Use numeric value for inline styles)
                    wordWrap: "break-word", // Allow word wrapping
                  }}
                >
                 {data.weight} kg
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
                
                >Destination:</b> 
                    <span
                  style={{
                    color: "#1237BF", // Set the text color
                    fontSize: 14, // Adjust font size if necessary
                    fontFamily: "Outfit", // Specify the font family
                    fontWeight: 400, // Set font weight (Note: Use numeric value for inline styles)
                    wordWrap: "break-word", // Allow word wrapping
                  }}
                >
                {data.receiver_address.address_name}
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
            <IconButton
              aria-label="fingerprint"
              color="secondary"
              onClick={() => onOrderButtonClick(data)}
              sx={{
                fontSize: "2rem",
              }}
            >
              <KeyboardArrowRightRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default JobSheetOrder;

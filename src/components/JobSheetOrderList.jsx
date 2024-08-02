import React from "react";
import JobSheetOrder from "./JobSheetOrder";
import { Box } from "@mui/system";
import loadingGif from "../Assets/imagesG/TruckAnimationTruvoey.gif";
import { Typography } from "@mui/material";

const JobSheetOrderList = ({ data, onOrderButtonClick }) => {
  // TODO : Handle empty list put an info graphics when no data
  return (
    <Box sx={{ height: "100%", overflowY: "auto" }}>
      {console.log(data)}
      {data != null && data.length > 0 &&
        data.map((order) => (
          <JobSheetOrder
            key={order._id}
            data={order}
            onOrderButtonClick={onOrderButtonClick}
          />
        ))}
        
      {(data?.length === 0 ) && (
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
      )}

      {data === null && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh", // Adjust this height as per your layout
          }}
        >
          <Typography component={"h1"}>No Order to Display</Typography>
        </Box>
      )}
    </Box>
  );
};

export default JobSheetOrderList;

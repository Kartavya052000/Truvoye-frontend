import React from "react";
import JobSheetOrder from "./JobSheetOrder";
import { Box } from "@mui/system";

const JobSheetOrderList = ({ data, onOrderButtonClick }) => {

  // TODO : Handle empty list put an info graphics when no data 
  return (
    <Box sx={{ height: "100%", overflowY: "auto" }}>
      {data.map((order) => (
        <JobSheetOrder
          key={order._id}
          data={order}
          onOrderButtonClick={onOrderButtonClick}
        />
      ))}
    </Box>
  );
};

export default JobSheetOrderList;

import React from "react";
import JobSheetOrder from "./JobSheetOrder";

const JobSheetOrderList = ({ data, onOrderButtonClick }) => {

  // TODO : Handle empty list put an info graphics when no data 
  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      {data.map((order) => (
        <JobSheetOrder
          key={order._id}
          data={order}
          onOrderButtonClick={onOrderButtonClick}
        />
      ))}
    </div>
  );
};

export default JobSheetOrderList;

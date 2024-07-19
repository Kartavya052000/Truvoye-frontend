import React, { useEffect, useState } from "react";
import { post } from "../api/api";
import { useParams } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import loadingGif from "../Assets/imagesG/TruckAnimationTruvoey.gif";

const OrderTracking = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const url = `/order/get/${id}`; 
      try {
        const response = await post(url);
        const orderDetails = response.data;
        setOrderDetails(orderDetails.order); 
        console.log(orderDetails)

        setStart({
          lat: orderDetails.order.pickup_address.latitude,
          lng: orderDetails.order.pickup_address.longitude,
        });

        setEnd({
          lat: orderDetails.order.receiver_address.latitude,
          lng: orderDetails.order.receiver_address.longitude,
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  return (
    <div className="parent">
      {start && end && orderDetails ? (
        <Box sx={{ position: 'relative', height: '100vh' }}>
          <Box sx={{ position: "absolute", top: 0, left: 0, zIndex: 10, background: "#FFF", pr: 2, pb: 2, borderRadius: "0 0 10px 0" }}>
            {console.log(orderDetails)}
            <Typography variant="h6" component="h1" gutterBottom>
              Order {orderDetails._id.slice(-10).toUpperCase()}
            </Typography>
            <Typography gutterBottom>
              ETA {orderDetails.duration || "Arriving Soon"}
            </Typography>
            <Typography gutterBottom>
              Distance {orderDetails.distance ? `${orderDetails.distance}` : "100 KM"}
            </Typography>
          </Box>
          <MapComponent start={start} end={end} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh", 
          }}
        >
          <img
            style={{ maxWidth: "300px" }}
            src={loadingGif}
            alt="Loading..."
          />
        </Box>
      )}
    </div>
  );
};

export default OrderTracking;

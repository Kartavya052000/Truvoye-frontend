import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, Polyline } from '@react-google-maps/api';
import { post } from "../api/api";
import { useParams } from 'react-router-dom';

function Map() {
  const [driverLocation, setDriverLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [routeIndex, setRouteIndex] = useState(0);
  const [zoom, setZoom] = useState(12); // Initial zoom level
  const { id } = useParams(); // Extract id from URL
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]); // Fetch details whenever id changes

  const fetchOrderDetails = async () => {
    const url = "/order/get/" + id;
    try {
      const response = await post(url);
      setOrderDetails(response.data);
    //    setDriverLocation({
    //     lat: response.data.order.pickup_address.pickup_lat,
    //     lng: response.data.order.pickup_address.pickup_lng,
    //   });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (directions && directions.routes[0].overview_path) {
      const route = directions.routes[0].overview_path;
      const intervalId = setInterval(() => {
        setRouteIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex >= route.length) {
            clearInterval(intervalId);
          }
          setDriverLocation(route[newIndex]);
          return newIndex;
        });
      }, 4000); // Update marker position every 10 seconds
    }
  }, [directions]);

  useEffect(() => {
    // Adjust zoom level based on truck's location
    if (driverLocation && orderDetails) {
      const distanceToDestination = getDistanceBetweenPoints(driverLocation, {
        lat: orderDetails.order.receiver_address.receiver_lat,
        lng: orderDetails.order.receiver_address.receiver_lng,
      });
      if (distanceToDestination < 1000) {
        setZoom(15); // Zoom in when close to destination
      } else if (distanceToDestination < 5000) {
        setZoom(13); // Zoom in when approaching destination
      } else {
        setZoom(12); // Default zoom level
      }
    }
  }, [driverLocation, orderDetails]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      {orderDetails && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100vh' }}
          center={driverLocation}
          zoom={zoom}
        >
          {driverLocation && (
            <Marker
              position={driverLocation}
              icon={{
                url: 'https://maps.google.com/mapfiles/kml/shapes/truck.png', // Use a truck icon
                scaledSize: new window.google.maps.Size(30, 30), // Scale the icon to 30x30 pixels
              }}
            />
          )}
          <DirectionsService
            options={{
              destination: {
                lat: orderDetails.order.receiver_address.receiver_lat,
                lng: orderDetails.order.receiver_address.receiver_lng,
              }, // Receiver address
              origin: {
                lat: orderDetails.order.pickup_address.pickup_lat,
                lng: orderDetails.order.pickup_address.pickup_lng,
              }, // Pickup address
              travelMode: 'DRIVING',
            }}
            callback={(result) => {
              if (result !== null) {
                setDirections(result);
              }
            }}
          />
          {directions && (
            <Polyline
              path={directions.routes[0].overview_path}
              options={{ strokeColor: '#F9A33F' }}
            />
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
}

// Helper function to calculate distance between two points
function getDistanceBetweenPoints(point1, point2) {
  const lat1 = point1.lat;
  const lng1 = point1.lng;
  const lat2 = point2.lat;
  const lng2 = point2.lng;
  const earthRadius = 6371; // in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance * 1000; // Convert to meters
}

function toRadians(deg) {
  return deg * (Math.PI / 180);
}

export default Map;



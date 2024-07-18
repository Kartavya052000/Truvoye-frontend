import React, { useEffect, useState, useCallback } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
  Polyline,
} from "@react-google-maps/api";
import { throttle } from "lodash";

const containerStyle = {
  width: "100%",
  height: "78vh",
};

const MapComponent = ({ start, end }) => {
  const [map, setMap] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);
  const [polylinePath, setPolylinePath] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [directions, setDirections] = useState(null);
  const [driverLocation, setDriverLocation] = useState(start);
  const [zoom, setZoom] = useState(12);

  const fetchDirections = useCallback(async () => {
    if (map) {
      const directionsService = new window.google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      if (result.status === "OK") {
        const route = result.routes[0].overview_path.map((p) => ({
          lat: p.lat(),
          lng: p.lng(),
        }));
        setRoutePoints(route);
        setDirections(result);
      } else {
        console.error(`Error fetching directions: ${result}`);
      }
    }
  }, [start, end, map]);

  useEffect(() => {
    if (start && end) {
      fetchDirections();
    }
  }, [start, end, fetchDirections]);

  const updateDriverLocation = useCallback(
    throttle((index) => {
        if (routePoints[index] && map) {
            setDriverLocation(routePoints[index]);
            const { lat, lng } = routePoints[index];
            try{
              map.panTo(new window.google.maps.LatLng(lat, lng))
            }catch (error) {
              console.log("Probably late throttle trigger ====> " + error)
            }
        }
    }, 500),
    [routePoints] // Dependencies for the callback
);

  useEffect(() => {
    if (map && routePoints.length > 0) {

      const interval = setInterval(() => {
        if (currentIndex < routePoints.length - 1) {
          setPolylinePath([
            routePoints[currentIndex],
            routePoints[currentIndex + 1],
          ]);
          updateDriverLocation(currentIndex)
          setCurrentIndex((currentIndex) => currentIndex + 1);
        } else {
          clearInterval(interval);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [map, routePoints, currentIndex, updateDriverLocation]);



  useEffect(() => {
    if (polylinePath.length > 1) {
      const distanceToDestination = getDistanceBetweenPoints(polylinePath[0], polylinePath[1]);
      if (distanceToDestination < 1000) {
        setZoom(15); // Zoom in when close to destination
      } else if (distanceToDestination < 5000) {
        setZoom(13); // Zoom in when approaching destination
      } else {
        setZoom(12); // Default zoom level
      }

      const lineSymbol = {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: "#1237BF",
      };

      // const truckSymbol = {
      //   path: "M19 6h-2v-2c0-1.1-0.9-2-2-2h-10c-1.1 0-2 0.9-2 2v2h-2c-1.1 0-2 0.9-2 2v11c0 1.1 0.9 2 2 2h1c0 1.7 1.3 3 3 3s3-1.3 3-3h4c0 1.7 1.3 3 3 3s3-1.3 3-3h1c1.1 0 2-0.9 2-2v-11c0-1.1-0.9-2-2-2zm-13-2h10v2h-10v-2zm-4 7h3v4h-3v-4zm3 7c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1-0.4 1-1 1zm10 0c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1-0.4 1-1 1zm3-3h-3v-5c0-0.6-0.4-1-1-1h-10c-0.6 0-1 0.4-1 1v5h-3v-6h18v6z",
      //   fillColor: "#000",
      //   fillOpacity: 1,
      //   scale: 1,
      //   strokeColor: "#000",
      //   strokeWeight: 1,
      // };

      const line = new window.google.maps.Polyline({
        path: polylinePath,
        icons: [
          {
            icon: lineSymbol,
            offset: "0%",
          },
        ],
        map: map,

        strokeWeight: 0,
      });

      let offset = 0;
      const interval = setInterval(() => {
        offset += 1;
        if (offset > 100) {
          clearInterval(interval); 
          return;
        }
        const icons = line.get("icons");
        icons[0].offset = `${offset}%`; 
        line.set("icons", icons);
      }, 3);

      return () => {
        clearInterval(interval);
        line.setMap(null); // Remove the previous polyline
      };
    }
  }, [polylinePath, map]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={start} // Default center while loading
        zoom={zoom} // Default zoom while loading
        onLoad={(map) => setMap(map)}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              strokeColor: "#F9A33F", // Red color
            }}
          />
        )}

        {polylinePath.length > 1 && (
          <Polyline
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

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

export default MapComponent;

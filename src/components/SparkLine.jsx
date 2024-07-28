// import * as React from 'react';
// import axios from 'axios';
// import { green, blue } from '@mui/material/colors';
// import Stack from '@mui/material/Stack';
// import { LineChart } from '@mui/x-charts/LineChart';
// import { post } from '../api/api';

// export default function SparkLine() {
//   const [orderData, setOrderData] = React.useState([]);
//   const [driverData, setDriverData] = React.useState([]);
//   const [xData, setXData] = React.useState([]);

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const orderResponse = await post('/order/get');
//         const orders = orderResponse.data.orders;
//         console.log(orders,"orders")
//         const orderCounts = orders.reduce((acc, order) => {
//           const date = order.created_at.split('T')[0];
//           acc[date] = (acc[date] || 0) + 1;
//           return acc;
//         }, {});
// console.log(orders,"OOO")

//         const driverResponse = await post('/driver/get?active=false');
//         const drivers = driverResponse.data.drivers;

//         const driverCounts = drivers.reduce((acc, driver) => {
//           const date = driver.createdAt.split('T')[0];
//           acc[date] = (acc[date] || 0) + 1;
//           return acc;
//         }, {});

//         const combinedDates = Array.from(new Set([...Object.keys(orderCounts), ...Object.keys(driverCounts)])).sort();

//         setOrderData(combinedDates.map(date => orderCounts[date] || 0));
//         setDriverData(combinedDates.map(date => driverCounts[date] || 0));
//         setXData(combinedDates);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Stack direction="column" width="100%" spacing={1}
//     sx={{
//       backgroundColor: 'white',
//       maxHeight:"325px", // Set the background color to white
//       borderRadius:"10px"
//     }}>
//             <div className="graph_text">Orders & Drivers</div>
//         <div className='line_under'></div>
//       <LineChart
//         xAxis={[{ data: xData, scaleType: 'point' }]}
//         yAxis={[{ min: 0, max: Math.max(...orderData, ...driverData) }]}
//         series={[
//           { data: orderData, showMark: false, label: 'Orders', color: green[500] },
//           { data: driverData, showMark: false, label: 'Drivers', color: blue[500] },
//         ]}
//         height={320}
//         margin={{ top: 20, bottom: 30, left: 75 }}
//         grid={{ horizontal: true }}
       
//       />
//     </Stack>
//   );
// }
import * as React from 'react';
import { green, blue } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SparkLine() {
  const [orderData, setOrderData] = React.useState([]);
  const [driverData, setDriverData] = React.useState([]);
  const [xData, setXData] = React.useState([]);

  React.useEffect(() => {
    // Static data with random fluctuations
    const staticOrderData = [
      5, 12, 18, 25, 22,
      28, 33, 38, 35, 48,
      55, 52, 60, 65, 70
    ];
    
    const staticDriverData = [
      3, 7, 11, 14, 16,
      19, 23, 26, 25, 29,
      33, 37, 39, 42, 45
    ];

    const staticXData = [
      "2024-07-01", "2024-07-02", "2024-07-03", "2024-07-04", "2024-07-05",
      "2024-07-06", "2024-07-07", "2024-07-08", "2024-07-09", "2024-07-10",
      "2024-07-11", "2024-07-12", "2024-07-13", "2024-07-14", "2024-07-15"
    ];

    setOrderData(staticOrderData);
    setDriverData(staticDriverData);
    setXData(staticXData);
  }, []);

  return (
   
   
    <Stack direction="column" width="100%" spacing={1}
    sx={{
      backgroundColor: 'white',
      minHeight: "348px",
      borderRadius: "10px",
      gridColumn:"span 2"
    }}>
    <div className="graph_text">Orders & Drivers</div>
    <div className='line_under'></div>
    
    {/* Stack to align chart and legend horizontally */}
    <Stack direction="column" spacing={2} alignItems="flex-start" sx={{}}>
      {/* Line Chart */}
      <LineChart
        xAxis={[{ data: xData, scaleType: 'point' }]}
        yAxis={[{ min: 0, max: Math.max(...orderData, ...driverData) }]}
        series={[
          { data: orderData, showMark: true, color: green[500] },
          { data: driverData, showMark: true, color: blue[500] },
        ]}
        height={220}
        margin={{ top: 20, bottom: 30, left: 75 }}
        grid={{ horizontal: true }}
        sx={{ flex: 1 }}
      />
      
      {/* Legend */}
      <Stack direction="row" spacing={1} sx={{ marginLeft: "3rem !important" }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 10, height: 10, backgroundColor: green[500], marginRight: 8 }}></div>
          <span class="spark_text">Orders</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 10, height: 10, backgroundColor: blue[500], marginRight: 8 }}></div>
          <span class="spark_text">Drivers</span>
        </div>
      </Stack>
    </Stack>
  </Stack>
  );
}

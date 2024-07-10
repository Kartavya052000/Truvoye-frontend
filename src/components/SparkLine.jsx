import * as React from 'react';
import axios from 'axios';
import { green, blue } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { post } from '../api/api';

export default function SparkLine() {
  const [orderData, setOrderData] = React.useState([]);
  const [driverData, setDriverData] = React.useState([]);
  const [xData, setXData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await post('/order/get');
        const orders = orderResponse.data;
        
        const orderCounts = orders.reduce((acc, order) => {
          const date = order.created_at.split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const driverResponse = await post('/driver/get?active=false');
        const drivers = driverResponse.data;

        const driverCounts = drivers.reduce((acc, driver) => {
          const date = driver.createdAt.split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const combinedDates = Array.from(new Set([...Object.keys(orderCounts), ...Object.keys(driverCounts)])).sort();

        setOrderData(combinedDates.map(date => orderCounts[date] || 0));
        setDriverData(combinedDates.map(date => driverCounts[date] || 0));
        setXData(combinedDates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack direction="column" width="100%" spacing={1}
    sx={{
      backgroundColor: 'white',
      maxHeight:"325px" // Set the background color to white
    }}>
            <div className="graph_text">Orders & Drivers</div>
        <div className='line_under'></div>
      <LineChart
        xAxis={[{ data: xData, scaleType: 'point' }]}
        yAxis={[{ min: 0, max: Math.max(...orderData, ...driverData) }]}
        series={[
          { data: orderData, showMark: false, label: 'Orders', color: green[500] },
          { data: driverData, showMark: false, label: 'Drivers', color: blue[500] },
        ]}
        height={320}
        margin={{ top: 20, bottom: 30, left: 75 }}
       
      />
    </Stack>
  );
}

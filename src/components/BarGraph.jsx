// import * as React from 'react';
// import axios from 'axios';
// import Stack from '@mui/material/Stack';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import { post } from '../api/api'; // Import your API post function

// function TickParamsSelector({
//   tickPlacement,
//   tickLabelPlacement,
//   setTickPlacement,
//   setTickLabelPlacement,
// }) {
//   return (
//     <Stack direction="column" justifyContent="space-between" sx={{ width: '100%' }}>
//       <FormControl>
//         <FormLabel id="tick-placement-radio-buttons-group-label">
//           tickPlacement
//         </FormLabel>
//         <RadioGroup
//           row
//           aria-labelledby="tick-placement-radio-buttons-group-label"
//           name="tick-placement"
//           value={tickPlacement}
//           onChange={(event) => setTickPlacement(event.target.value)}
//         >
//           <FormControlLabel value="start" control={<Radio />} label="start" />
//           <FormControlLabel value="end" control={<Radio />} label="end" />
//           <FormControlLabel value="middle" control={<Radio />} label="middle" />
//           <FormControlLabel
//             value="extremities"
//             control={<Radio />}
//             label="extremities"
//           />
//         </RadioGroup>
//       </FormControl>
//       <FormControl>
//         <FormLabel id="label-placement-radio-buttons-group-label">
//           tickLabelPlacement
//         </FormLabel>
//         <RadioGroup
//           row
//           aria-labelledby="label-placement-radio-buttons-group-label"
//           name="label-placement"
//           value={tickLabelPlacement}
//           onChange={(event) => setTickLabelPlacement(event.target.value)}
//         >
//           <FormControlLabel value="tick" control={<Radio />} label="tick" />
//           <FormControlLabel value="middle" control={<Radio />} label="middle" />
//         </RadioGroup>
//       </FormControl>
//     </Stack>
//   );
// }

// const valueFormatter = (value) => `${value}`;

// const chartSetting = {
//   yAxis: [
//     {
//       label: 'Number of Orders',
//       valueFormatter,
//     },
//   ],
//   series: [
//     {
//       dataKey: 'value',
//       label: 'Orders',
//       valueFormatter,
//       color: '#1237BF', // Set the bar color here
//     },
//   ],
//   height: 300,
//   sx: {
//     backgroundColor: 'white', // Set the background color to white
//     [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
//       transform: 'translateX(-10px)',
//     },
//   },
// };

// export default function BarGraph() {
//   const [tickPlacement, setTickPlacement] = React.useState('middle');
//   const [tickLabelPlacement, setTickLabelPlacement] = React.useState('middle');
//   const [dataset, setDataset] = React.useState([]);

//   React.useEffect(() => {
//     post('/order/get')
//       .then(response => {
//         const orders = response.data.orders;
//         const orderCounts = orders.reduce((acc, order) => {
//           const date = order.created_at.split('T')[0];
//           acc[date] = (acc[date] || 0) + 1;
//           return acc;
//         }, {});
        
//         const data = Object.entries(orderCounts).map(([date, value]) => ({
//           date,
//           value,
//         }));

//         setDataset(data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div style={{ width: '100%',backgroundColor:'white',borderRadius:"10px" }}>
//         <div className="graph_text">Total Shipment Delivered</div>
//         <div className='line_under'></div>
   
//       {/* <TickParamsSelector
//         tickPlacement={tickPlacement}
//         tickLabelPlacement={tickLabelPlacement}
//         setTickPlacement={setTickPlacement}
//         setTickLabelPlacement={setTickLabelPlacement}
//       /> */}
//       <BarChart
//         dataset={dataset}
//         xAxis={[
//           {
//             scaleType: 'band',
//             dataKey: 'date',
//             tickPlacement,
//             tickLabelPlacement,
//           },
//         ]}
//         {...chartSetting}
//         grid={{ horizontal: true }}

//       />
//     </div>
//   );
// }


import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';


const valueFormatter = (value) => `${value}`;

const chartSetting = {
  // yAxis: [
  //   {
  //     label: 'Number of Orders',
  //     valueFormatter,
  //   },
  // ],
  series: [
    {
      dataKey: 'value',
      label: 'Orders',
      valueFormatter,
      color: '#1237BF', // Set the bar color here
    },
  ],
  height: 300,
  sx: {
    backgroundColor: 'white', // Set the background color to white
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function BarGraph() {
  const [tickPlacement, setTickPlacement] = React.useState('middle');
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState('middle');
  const [dataset, setDataset] = React.useState([]);

  React.useEffect(() => {
    // Expanded static mock data
    const staticData = [
      { date: '2024-07-15', value: 75 },
      { date: '2024-07-01', value: 5 },
      { date: '2024-07-08', value: 40 },
      { date: '2024-07-12', value: 60 },
      { date: '2024-07-03', value: 15 },
      { date: '2024-07-07', value: 35 },
      { date: '2024-07-05', value: 25 },
      { date: '2024-07-10', value: 50 },
      { date: '2024-07-02', value: 10 },
      { date: '2024-07-14', value: 70 },
      { date: '2024-07-04', value: 20 },
      { date: '2024-07-11', value: 55 },
      { date: '2024-07-09', value: 45 },
      { date: '2024-07-06', value: 30 },
      { date: '2024-07-13', value: 65 },
      { date: '2024-08-01', value: 80 }, // Additional data
      { date: '2024-08-05', value: 55 }, // Additional data
      { date: '2024-08-10', value: 40 }, // Additional data
      { date: '2024-08-15', value: 75 }, // Additional data
    ];

    setDataset(staticData);
  }, []);

  return (
    <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '10px', gridColumn: "span 3" }}>
      <div className="graph_text">Total Shipment Delivered</div>
      <div className='line_under'></div>
      {/* <TickParamsSelector
        tickPlacement={tickPlacement}
        tickLabelPlacement={tickLabelPlacement}
        setTickPlacement={setTickPlacement}
        setTickLabelPlacement={setTickLabelPlacement}
      /> */}
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'date',
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        {...chartSetting}
        grid={{ horizontal: true }}
      />
    </div>
  );
}

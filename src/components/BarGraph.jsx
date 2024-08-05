


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

  series: [
    {
      dataKey: 'value',
      label: 'Orders',
      valueFormatter,
      color: '#42a5f5', // Set the bar color here
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
    <div className="graph-container">
      <div className="graph_text">Total Shipment Delivered</div>
      <div className='line_under'></div>
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

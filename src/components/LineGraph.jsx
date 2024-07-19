import * as React from 'react';
import { blue, red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import { useYScale, useDrawingArea } from '@mui/x-charts/hooks';
import { LineChart, areaElementClasses } from '@mui/x-charts/LineChart';
import { post } from '../api/api';

function ColorSwich({ threshold, color1, color2, id }) {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;

  const scale = useYScale();
  const y0 = scale(threshold);
  const off = y0 !== undefined ? y0 / svgHeight : 0;

  return (
    <defs>
      <linearGradient
        id={id}
        x1="0"
        x2="0"
        y1="0"
        y2={`${svgHeight}px`}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={off} stopColor={color1} stopOpacity={1} />
        <stop offset={off} stopColor={color2} stopOpacity={1} />
      </linearGradient>
    </defs>
  );
}

function ColorPalette({ id }) {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;

  const scale = useYScale();

  return (
    <defs>
      <linearGradient
        id={id}
        x1="0"
        x2="0"
        y1="0"
        y2={`${svgHeight}px`}
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={scale(5000) / svgHeight}
          stopColor={blue[400]}
          stopOpacity={1}
        />
        <stop
          offset={scale(4000) / svgHeight}
          stopColor={blue[400]}
          stopOpacity={1}
        />
        <stop
          offset={scale(4000) / svgHeight}
          stopColor={blue[300]}
          stopOpacity={1}
        />
        <stop
          offset={scale(3000) / svgHeight}
          stopColor={blue[300]}
          stopOpacity={1}
        />
        <stop
          offset={scale(3000) / svgHeight}
          stopColor={blue[200]}
          stopOpacity={1}
        />
        <stop
          offset={scale(2000) / svgHeight}
          stopColor={blue[200]}
          stopOpacity={1}
        />
        <stop
          offset={scale(2000) / svgHeight}
          stopColor={blue[100]}
          stopOpacity={1}
        />
        <stop
          offset={scale(1000) / svgHeight}
          stopColor={blue[100]}
          stopOpacity={1}
        />
        <stop
          offset={scale(1000) / svgHeight}
          stopColor={blue[50]}
          stopOpacity={1}
        />
        <stop offset={scale(0) / svgHeight} stopColor={blue[50]} stopOpacity={1} />
        <stop offset={scale(0) / svgHeight} stopColor={red[100]} stopOpacity={1} />
        <stop
          offset={scale(-1000) / svgHeight}
          stopColor={red[100]}
          stopOpacity={1}
        />
        <stop
          offset={scale(-1000) / svgHeight}
          stopColor={red[200]}
          stopOpacity={1}
        />
        <stop
          offset={scale(-2000) / svgHeight}
          stopColor={red[200]}
          stopOpacity={1}
        />
        <stop
          offset={scale(-3000) / svgHeight}
          stopColor={red[300]}
          stopOpacity={1}
        />
      </linearGradient>
    </defs>
  );
}

export default function AreaChartFillByValue() {
  const [data, setData] = React.useState([]);
  const [xData, setXData] = React.useState([]);

  React.useEffect(() => {
    post("/order/get")
      .then(response => {
        const orders = response.data.orders;
        const counts = orders.reduce((acc, order) => {
          const date = order.created_at.split('T')[0];
          acc[date] = (acc[date] || 0) + order.cost;
          return acc;
        }, {});

        const sortedDates = Object.keys(counts).sort((a, b) => new Date(a) - new Date(b));
        const sortedData = sortedDates.map(date => counts[date]);

        console.log("Sorted Dates:", sortedDates);
        console.log("Sorted Data:", sortedData);

        setXData(sortedDates);
        setData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Stack direction="column" width="100%" spacing={1} sx={{ backgroundColor: 'white', minHeight: "325px", borderRadius: "10px" }}>
      <div className="graph_text">Total Earnings</div>
      <div className='line_under'></div>
      <LineChart
        xAxis={[{ data: xData, scaleType: 'point' }]}
        yAxis={[{ min: 0, max: Math.max(...data) }]}
        series={[{ data, showMark: false, area: true }]}
        height={200}
        margin={{ top: 20, bottom: 30, left: 75 }}
        sx={{
          padding: "1rem",
          [`& .${areaElementClasses.root}`]: {
            fill: 'url(#swich-color-id-2)',
          },
        }}
        grid={{ horizontal: true }}
      >
        <ColorPalette id="swich-color-id-2" />
        <rect x={0} y={0} width={5} height="100%" fill="url(#swich-color-id-2)" />
      </LineChart>
    </Stack>
  );
}

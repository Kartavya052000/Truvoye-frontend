import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { post } from '../api/api';
import { Stack } from '@mui/system';

export default function PieCharts() {
  const [orderStatusData, setOrderStatusData] = React.useState([]);

  React.useEffect(() => {
    post("/order/statusReport")
      .then(response => {
        const statusCounts = response.data.statusCounts;
        const pieData = [
          { id: 0, value: statusCounts.unassigned, color: '#1237BF' }, // Blue
          { id: 1, value: statusCounts.assigned, color: '#F9A33F' }, // Orange
          { id: 2, value: statusCounts.in_progress, color: '#939393' }, // Gray
          { id: 3, value: statusCounts.completed, color: '#64B5F6' }, // Light Blue
        ];
        setOrderStatusData(pieData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Stack className='pie-container'>
      <div className="graph_text">Order Status</div>
      <div className='line_under'></div>
      <Stack direction="column" width="100%" spacing={1}>
        {/* Pie Chart */}
        <PieChart
          series={[
            {
              data: orderStatusData,
              colors: orderStatusData.map(item => item.color), // Use dynamic colors
            },
          ]}
          height={250}
          sx={{ backgroundColor: 'white', marginLeft: "5rem" }}
        />
        {/* Legend */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginLeft: '20px',marginTop:"0 !important",marginBottom:"1rem" }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, backgroundColor: '#1237BF', marginRight: 8 }}></div>
            <span className="spark_text">Unassigned</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, backgroundColor: '#F9A33F', marginRight: 8 }}></div>
            <span className="spark_text">Assigned</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, backgroundColor: '#939393', marginRight: 8 }}></div>
            <span className="spark_text">In Progress</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, backgroundColor: '#64B5F6', marginRight: 8 }}></div>
            <span className="spark_text">Completed</span>
          </div>
        </div>
      </Stack>
    </Stack>
  );
}

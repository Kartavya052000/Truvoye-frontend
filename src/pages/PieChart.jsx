import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { post } from '../api/api';

export default function PieCharts() {
  const [orderStatusData, setOrderStatusData] = React.useState([]);

  React.useEffect(() => {
    post("/order/statusReport")
      .then(response => {
        const statusCounts = response.data.statusCounts;
        const pieData = [
          { id: 0, value: statusCounts.unassigned, label: 'Unassigned' },
          { id: 1, value: statusCounts.assigned, label: 'Assigned' },
          { id: 2, value: statusCounts.in_progress, label: 'In Progress' },
          { id: 3, value: statusCounts.completed, label: 'Completed' },
        ];
        setOrderStatusData(pieData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div style={{ width: '100%', backgroundColor: 'white', minHeight: '358px', borderRadius: '10px' }}>
      <div className="graph_text">Order Status</div>
      <div className='line_under'></div>
      <PieChart
        series={[
          {
            data: orderStatusData,
          },
        ]}
        height={250}
        sx={{ backgroundColor: 'white', marginTop: '40px' }}
      />
    </div>
  );
}

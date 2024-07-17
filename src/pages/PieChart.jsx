import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieCharts() {
  return (
    <div style={{ width: '100%',backgroundColor:'white',minHeight:"358px",borderRadius:"10px" }}>
   <div className="graph_text">Total Shipment Delivered</div>
        <div className='line_under'></div>
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
    //   width={400}
      height={205}
      sx={{backgroundColor:'white',marginTop:"40px"}}
    />
    </div>
  );
}

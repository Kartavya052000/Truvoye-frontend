import React from 'react'
import LineGraph from '../components/LineGraph'
import BarGraph from '../components/BarGraph'
import SparkLine from '../components/SparkLine'
import BasicPie from './PieChart'
import PieCharts from './PieChart'
import '../styles/Analytics.css';
import AnalyticCard from './AnalyticCard'
import truck from "../Assets/icons/Truck.svg"
import orders from "../Assets/icons/Orders.svg"
import coin from "../Assets/icons/coins-hand.svg"
import trend from "../Assets/icons/trend-up-01.svg"
import { post } from '../api/api'
const Analytics = () => {
  const [orderStatusData, setOrderStatusData] = React.useState([]);
  const [driverStatusData, SetdriverStatusData] = React.useState([]);

  React.useEffect(() => {
    post("/order/statusReport")
      .then(response => {
   setOrderStatusData(response.data)

      })
       .catch(error => {
        console.error('Error fetching data:', error);
      });
      let param = { count:0 };
      post(`/driver/get?count=0`)
      .then(response =>{
        SetdriverStatusData(response.data)      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },[])
  return (
    <>
        <div className="card-container">
      <AnalyticCard
          icon={<img src={orders} alt="orders" />}
          value={orderStatusData.totalCount}
        label="Total Orders"
        percentage="0.43%"
        direction="up"
      />
      <AnalyticCard
          icon={<img src={coin} alt="Coin" />}
          value={orderStatusData.totalRevenue}
        label="Total Revenue"
        percentage="4.35%"
        direction="up"
      />
      <AnalyticCard
          icon={<img src={trend} alt="trend" />}
          value={orderStatusData.statusCounts?.in_progress}
        label="Order-In-Progress"
        percentage="2.59%"
        direction="up"
      />
      <AnalyticCard
          icon={<img src={truck} alt="Truck" />}
          value={driverStatusData.totalCount}
        label="Total Drivers"
        percentage="0.95%"
        direction="down"
      />
    </div>
    <div className='analytics-container'>
    <div className="wrap-graphs">
      <LineGraph/>
      <SparkLine />
      <BarGraph />
      <PieCharts />
    </div>
      
    </div>
    </>
  )
}

export default Analytics

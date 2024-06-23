import React from 'react'

const OrderEstimateDetails = ({estimateData}) => {
  return (
    <div>
      <h1>Distance:{estimateData?.distance}</h1>
<h2>Time: {estimateData?.duration}</h2>
    </div>
  )
}

export default OrderEstimateDetails

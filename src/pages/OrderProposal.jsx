
import React, { useState } from 'react';

const OrderProposal = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [weight, setWeight] = useState('');
  const [estimation, setEstimation] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/OrderProposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickup_address: pickupAddress,
          receivers_address: receiverAddress,
          weight: weight,
          
        }),
      });
    


      if (!response.ok) {
        throw new Error('Failed to fetch order proposal');
      }

      const data = await response.json();
      console.log("Response received");
      setEstimation(data.estimation);
      setShippingInfo(data.shippingInfo);

    } catch (error) {
      console.error('Error calculating order proposal:', error);
    }
  };

  return (
    <div>
      <h2>Add an Order Proposal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pickup Address</label>
          <input
            type="text"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Receiver Address</label>
          <input
            type="text"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Weight of Shipment</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {estimation && (
        <div>
          <h3>Order Estimation</h3>
          <p>Cost: {estimation.cost}</p>
          <p>Time: {estimation.time}</p>
        </div>
      )}
      {shippingInfo && (
        <div>
          <h3>Shipping Information</h3>
          <p>Distance: {shippingInfo.distance}</p>
          <p>Estimated Time: {shippingInfo.duration}</p>
        </div>
      )}
    </div>
  );
};

export default OrderProposal;

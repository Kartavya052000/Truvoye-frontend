import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Autocomplete from 'react-google-autocomplete';

const OrderProposal = () => {
  const [estimation, setEstimation] = useState(null);
  //const [shippingInfo, setShippingInfo] = useState(null);

  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    pickupAddress: Yup.string().required('Pickup Address is required'),
    receiverAddress: Yup.string().required('Receiver Address is required'),
    weight: Yup.number().required('Weight is required').positive('Weight must be positive'),
  });

  // Handle form submission with Formik
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Submitting data:', {
        pickup_address: values.pickupAddress,
        pickup_latitude: values.pickupCoords.lat,
        pickup_longitude: values.pickupCoords.lng,
        receivers_address: values.receiverAddress,
        receiver_latitude: values.receiverCoords.lat,
        receiver_longitude: values.receiverCoords.lng,
        weight: values.weight,
        
      });

      const response = await axios.post('http://localhost:3000/api/orderDetails/OrderProposal', {
        pickup_address: values.pickupAddress,
        pickup_latitude: values.pickupCoords.lat,
        pickup_longitude: values.pickupCoords.lng,
        receivers_address: values.receiverAddress,
        receiver_latitude: values.receiverCoords.lat,
        receiver_longitude: values.receiverCoords.lng,
        weight: values.weight,
      });

      if (!response.data) {
        throw new Error('Failed to fetch order proposal');
      }

      // Update state with response data
      setEstimation(response.data.estimation);
      //setShippingInfo(response.data.shippingInfo);

    } catch (error) {
      console.error('Error calculating order proposal:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add an Order Proposal</h2>
      <Formik
        initialValues={{
          pickupAddress: '',
          pickupCoords: { lat: null, lng: null },
          receiverAddress: '',
          receiverCoords: { lat: null, lng: null },
          weight: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="pickupAddress">Pickup Address</label>
              <Autocomplete
                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                onPlaceSelected={(place) => {
                  const address = place.formatted_address;
                  const lat = place.geometry.location.lat();
                  const lng = place.geometry.location.lng();
                  setFieldValue('pickupAddress', address);
                  setFieldValue('pickupCoords', { lat, lng });
                }}
                types={['address']}
                placeholder="Enter Pickup Address"
              />
              <ErrorMessage name="pickupAddress" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="receiverAddress">Receiver Address</label>
              <Autocomplete
                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                onPlaceSelected={(place) => {
                  const address = place.formatted_address;
                  const lat = place.geometry.location.lat();
                  const lng = place.geometry.location.lng();
                  setFieldValue('receiverAddress', address);
                  setFieldValue('receiverCoords', { lat, lng });
                }}
                types={['address']}
                placeholder="Enter Receiver Address"
              />
              <ErrorMessage name="receiverAddress" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="weight">Weight of Shipment</label>
              <Field type="number" id="weight" name="weight" />
              <ErrorMessage name="weight" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Calculating...' : 'Calculate'}
            </button>
          </Form>
        )}
      </Formik>

      {estimation && (
        <div>
          <h3>Order Estimation</h3>
          <p>Cost: {estimation.distance}</p>
          <p>Time: {estimation.time}</p>
        </div>
      )}

      
    </div>
  );
};

export default OrderProposal;

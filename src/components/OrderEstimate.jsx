  import React, { useState } from 'react'
  import { Formik, Form, Field, ErrorMessage } from 'formik';
  import * as Yup from 'yup';
  import axios from 'axios';
  import Autocomplete from 'react-google-autocomplete';
  import { post } from "../api/api";

  const OrderEstimate = ({handleGetEstimate}) => {
      const [estimation, setEstimation] = useState();
      //const [shippingInfo, setShippingInfo] = useState(null);
    
      // Define Yup validation schema
      const validationSchema = Yup.object().shape({
        pickupAddress: Yup.string().required('Pickup Address is required'),
        receiverAddress: Yup.string().required('Receiver Address is required'),
        weight: Yup.number().required('Weight is required').positive('Weight must be positive'),
      });
    
      // Handle form submission with Formik
      const handleSubmit = async (values, { setSubmitting }) => {
        // try {
      let data ={
        pickup_address:{
          latitude:values.pickupCoords.lat,
          longitude:values.pickupCoords.lng,
        },
        receivers_address:{
          latitude:values.receiverCoords.lat,
          longitude:values.receiverCoords.lng,
        },
        weight:values.weight,
      }
      post("/orderDetails/OrderProposal", data)
      .then((response) => {
          handleGetEstimate({ ...response.data, ...values });
          setSubmitting(false);

         
       
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;

        console.log(response);
        
      });
      
      };
    
    return (
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
    )
  }

  export default OrderEstimate

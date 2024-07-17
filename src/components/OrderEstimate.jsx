  // import React, { useState } from 'react'
  // import { Formik, Form, Field, ErrorMessage } from 'formik';
  // import * as Yup from 'yup';
  // import axios from 'axios';
  // import Autocomplete from 'react-google-autocomplete';
  // import { post } from "../api/api";

  // const OrderEstimate = ({handleGetEstimate}) => {
  //     const [estimation, setEstimation] = useState();
  //     //const [shippingInfo, setShippingInfo] = useState(null);
    
  //     // Define Yup validation schema
  //     const validationSchema = Yup.object().shape({
  //       pickupAddress: Yup.string().required('Pickup Address is required'),
  //       receiverAddress: Yup.string().required('Receiver Address is required'),
  //       weight: Yup.number().required('Weight is required').positive('Weight must be positive'),
  //     });
    
  //     // Handle form submission with Formik
  //     const handleSubmit = async (values, { setSubmitting }) => {
  //       // try {
  //     let data ={
  //       pickup_address:{
  //         latitude:values.pickupCoords.lat,
  //         longitude:values.pickupCoords.lng,
  //       },
  //       receivers_address:{
  //         latitude:values.receiverCoords.lat,
  //         longitude:values.receiverCoords.lng,
  //       },
  //       weight:values.weight,
  //     }
  //     post("/orderDetails/OrderProposal", data)
  //     .then((response) => {
  //         handleGetEstimate({ ...response.data, ...values });
  //         setSubmitting(false);

         
       
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting data:", error);
  //       const response = error.response;

  //       console.log(response);
        
  //     });
      
  //     };
    
  //   return (
  //     <Formik
  //     initialValues={{
  //       pickupAddress: '',
  //       pickupCoords: { lat: null, lng: null },
  //       receiverAddress: '',
  //       receiverCoords: { lat: null, lng: null },
  //       weight: '',
  //     }}
  //     validationSchema={validationSchema}
  //     onSubmit={handleSubmit}
  //   >
  //     {({ setFieldValue, isSubmitting }) => (
  //       <Form>
  //         <div>
  //           <label htmlFor="pickupAddress">Pickup Address</label>
  //           <Autocomplete
  //             apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
  //             onPlaceSelected={(place) => {
  //               const address = place.formatted_address;
  //               const lat = place.geometry.location.lat();
  //               const lng = place.geometry.location.lng();
  //               setFieldValue('pickupAddress', address);
  //               setFieldValue('pickupCoords', { lat, lng });
  //             }}
  //             types={['address']}
  //             placeholder="Enter Pickup Address"
  //           />
  //           <ErrorMessage name="pickupAddress" component="div" className="error" />
  //         </div>

  //         <div>
  //           <label htmlFor="receiverAddress">Receiver Address</label>
  //           <Autocomplete
  //             apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
  //             onPlaceSelected={(place) => {
  //               const address = place.formatted_address;
  //               const lat = place.geometry.location.lat();
  //               const lng = place.geometry.location.lng();
  //               setFieldValue('receiverAddress', address);
  //               setFieldValue('receiverCoords', { lat, lng });
  //             }}
  //             types={['address']}
  //             placeholder="Enter Receiver Address"
  //           />
  //           <ErrorMessage name="receiverAddress" component="div" className="error" />
  //         </div>

  //         <div>
  //           <label htmlFor="weight">Weight of Shipment</label>
  //           <Field type="number" id="weight" name="weight" />
  //           <ErrorMessage name="weight" component="div" className="error" />
  //         </div>

  //         <button type="submit" disabled={isSubmitting}>
  //           {isSubmitting ? 'Calculating...' : 'Calculate'}
  //         </button>
  //       </Form>
  //     )}
  //   </Formik>
  //   )
  // }

  // export default OrderEstimate

  import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Autocomplete from 'react-google-autocomplete';
import { post } from "../api/api";
import {
  TextField,
  Container,
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import AlertMessage from "../components/AlertMessage";
import { width } from '@mui/system';

const validationSchema = Yup.object({
  pickupAddress: Yup.string().required('Pickup Address is required'),
  receiverAddress: Yup.string().required('Receiver Address is required'),
  weight: Yup.number().required('Weight is required').positive('Weight must be positive'),
});

const textFieldStyle = {
  width: '100%',
  marginBottom: '16px',
  padding: '8px',
  fontSize: '14px',
  boxSizing: 'border-box',
  borderRadius: '20px', // Adding border radius
  border: '1px solid #1237BF', // Adding a border
};

const formItemStyle = {
  display: 'block',
  alignItems: 'start',
  textAlign: 'left',
  
};

const labelStyle = {
  width: '150px', // Adjust width as needed
  marginRight: '16px',
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#1237BF',
};


const OrderEstimateForm = ({ handleGetEstimate }) => {

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      pickup_address: {
        latitude: values.pickupCoords.lat,
        longitude: values.pickupCoords.lng,
      },
      receivers_address: {
        latitude: values.receiverCoords.lat,
        longitude: values.receiverCoords.lng,
      },
      weight: values.weight,
    };
    // console.log(v)
        // handleGetEstimate(values);

    post("/orderDetails/OrderProposal", data)
      .then((response) => {
        handleGetEstimate({ ...response.data, ...values });
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;
        // Handle error cases if needed
        setSubmitting(false);
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
      {(formik) => (
        <Form>
          <Container maxWidth="lg" >
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{padding : 0}}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  // minHeight="100vh"
                >
                  <Box
                    sx={{
                      width: { xs: '100%', sm: '80%', md : '60%', lg : '50%' },
                      margin: "auto",
                      border: "1px solid #000000",
                      borderRadius: "30px",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h1"
                      sx={{ textAlign: "center", m: 1, color: '#1237BF', fontWeight: 'bold'  }}
                    >
                      Order Estimate
                    </Typography>

                    <div style={formItemStyle}>
                      <label htmlFor="pickupAddress"  style={labelStyle}>Pickup Address</label>
                      <Autocomplete
                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                        onPlaceSelected={(place) => {
                          const address = place.formatted_address;
                          const lat = place.geometry.location.lat();
                          const lng = place.geometry.location.lng();
                          formik.setFieldValue('pickupAddress', address);
                          formik.setFieldValue('pickupCoords', { lat, lng });
                        }}
                        types={['address']}
                        placeholder="Enter Pickup Address"
                        style={textFieldStyle}
                      />
                      <ErrorMessage name="pickupAddress" component="div" className="error" />
                    </div>

                    <div style={formItemStyle}>
                      <label style={labelStyle}htmlFor="receiverAddress">Receiver Address</label>
                      <Autocomplete
                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                        onPlaceSelected={(place) => {
                          const address = place.formatted_address;
                          const lat = place.geometry.location.lat();
                          const lng = place.geometry.location.lng();
                          formik.setFieldValue('receiverAddress', address);
                          formik.setFieldValue('receiverCoords', { lat, lng });
                        }}
                        types={['address']}
                        placeholder="Enter Receiver Address"
                        style={textFieldStyle}
                      />
                      <ErrorMessage name="receiverAddress" component="div" className="error" />
                    </div>

                    <div style={formItemStyle}>
                      <label style={labelStyle}htmlFor="weight">Weight of Shipment (kg)</label>
                      <Field
                        type="number"
                        id="weight"
                        name="weight"
                        placeholder="Enter Weight"
                        style={textFieldStyle}
                      />
                      <ErrorMessage name="weight" component="div" className="error" />
                    </div>

                    <Button
                      sx={{ mt: 3 , background:"#1237BF", borderRadius: '8px' , padding: '10px 30px'}}
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? 'Calculating...' : 'Calculate'}
                    </Button>

                    <AlertMessage />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default OrderEstimateForm;


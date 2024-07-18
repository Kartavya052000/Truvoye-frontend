import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Autocomplete from 'react-google-autocomplete';
import { post } from "../api/api";
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";

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

    post("/orderDetails/OrderProposal", data)
      .then((response) => {
        handleGetEstimate({ ...response.data, ...values });
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{
        pickupAddress: 'Vancouver, BC, Canada',
        pickupCoords: { lat: 49.2827291, lng: -123.1207375 },
        receiverAddress: 'Burnaby, BC, Canada',
        receiverCoords: { lat: 49.2488091, lng: -122.9805104 },
        weight: '1800',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ padding: 0 }}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
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
                      sx={{ textAlign: "center", m: 1, color: '#1237BF', fontWeight: 'bold' }}
                    >
                      Order Estimate
                    </Typography>

                    <div style={formItemStyle}>
                      <label htmlFor="pickupAddress" style={labelStyle}>Pickup Address</label>
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
                        defaultValue="Vancouver, BC, Canada" // Set default value
                        placeholder="Enter Pickup Address"
                        style={textFieldStyle}
                      />
                      <ErrorMessage name="pickupAddress" component="div" className="error" />
                    </div>

                    <div style={formItemStyle}>
                      <label style={labelStyle} htmlFor="receiverAddress">Receiver Address</label>
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
                        defaultValue="Burnaby, BC, Canada" // Set default value
                        placeholder="Enter Receiver Address"
                        style={textFieldStyle}
                      />
                      <ErrorMessage name="receiverAddress" component="div" className="error" />
                    </div>

                    <div style={formItemStyle}>
                      <label style={labelStyle} htmlFor="weight">Weight of Shipment (kg)</label>
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
                      sx={{ mt: 3, background: "#1237BF", borderRadius: '8px', padding: '10px 30px' }}
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? 'Calculating...' : 'Calculate'}
                    </Button>
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

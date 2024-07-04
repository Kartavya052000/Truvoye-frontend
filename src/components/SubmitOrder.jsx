import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Box, Typography, Grid, Button, TextField } from "@mui/material";
import { post } from "../api/api";

const SubmitOrder = ({ initialData, handleOrderSubmission }) => {
  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    pickupDate: Yup.date().required('Pickup Date is required'),
    sendersName: Yup.string().required('Sender\'s Name is required'),
    sendersEmail: Yup.string().email('Invalid email').required('Sender\'s Email is required'),
    receiversName: Yup.string().required('Receiver\'s Name is required'),
    receiversEmail: Yup.string().email('Invalid email').required('Receiver\'s Email is required'),
  });

  // Handle form submission with Formik
  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      pickup_date: values.pickupDate,
      pickup_address: {
        address_name: initialData.pickupAddress,
        pickup_lat: initialData.pickupCoords.lat,
        pickup_lng: initialData.pickupCoords.lng,
      },
      receiver_address: {
        address_name: initialData.receiverAddress,
        receiver_lat: initialData.receiverCoords.lat,
        receiver_lng: initialData.receiverCoords.lng,
      },
      weight: initialData.weight,
      senders_name: values.sendersName,
      senders_email: values.sendersEmail,
      receivers_name: values.receiversName,
      receivers_email: values.receiversEmail,
    };

    post("/orderDetails/SubmitOrder", data)
      .then((response) => {
        handleOrderSubmission(response.data);
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setSubmitting(false);
      });
  };

  const textFieldStyle = {
    width: '100%',
    marginBottom: '16px',
  };

  return (
    <Formik
      initialValues={{
        pickupDate: '',
        sendersName: '',
        sendersEmail: '',
        receiversName: '',
        receiversEmail: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleChange }) => (
        <Form>
          <Container maxWidth="lg" sx={{ height: "100vh" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="100vh"
                >
                  <div
                    style={{
                      width: "60%",
                      margin: "auto",
                      border: "1px solid #000000",
                      borderRadius: "30px",
                      padding: "48px",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h1"
                      sx={{ textAlign: "center", m: 3 }}
                    >
                      Submit Order
                    </Typography>

                    <div>
                      <Field
                        name="pickupDate"
                        as={TextField}
                        type="date"
                        // label="Pickup Date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        style={textFieldStyle}
                      />
                      <ErrorMessage name="pickupDate" component="div" className="error" />
                    </div>

                    <div>
                      <Field
                        name="sendersName"
                        as={TextField}
                        label="Sender's Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        style={textFieldStyle}
                      />
                      <ErrorMessage name="sendersName" component="div" className="error" />
                    </div>

                    <div>
                      <Field
                        name="sendersEmail"
                        as={TextField}
                        type="email"
                        label="Sender's Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        style={textFieldStyle}
                      />
                      <ErrorMessage name="sendersEmail" component="div" className="error" />
                    </div>

                    <div>
                      <Field
                        name="receiversName"
                        as={TextField}
                        label="Receiver's Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        style={textFieldStyle}
                      />
                      <ErrorMessage name="receiversName" component="div" className="error" />
                    </div>

                    <div>
                      <Field
                        name="receiversEmail"
                        as={TextField}
                        type="email"
                        label="Receiver's Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        style={textFieldStyle}
                      />
                      <ErrorMessage name="receiversEmail" component="div" className="error" />
                    </div>

                    <Button
                      sx={{ mt: 3 }}
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Order'}
                    </Button>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default SubmitOrder;

import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Container, Box, Typography, Grid, Button } from "@mui/material";

const OrderEstimateDetails = ({ estimateData, handleUpdateEstimate }) => {
  const handleSubmit = (values, { setSubmitting }) => {
    handleUpdateEstimate(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        distance: estimateData?.distance || '',
        duration: estimateData?.duration || '',
        cost: estimateData?.cost || ''
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
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
                      Order Estimate Details
                    </Typography>

                    <div>
                      <Field
                        name="distance"
                        as={TextField}
                        label="Distance"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled
                      />
                    </div>

                    <div>
                      <Field
                        name="duration"
                        as={TextField}
                        label="Duration"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled
                      />
                    </div>

                    <div>
                      <Field
                        name="cost"
                        as={TextField}
                        label="Cost"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </div>

                    <Button
                      sx={{ mt: 3 }}
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Updating...' : 'Update Estimate'}
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

export default OrderEstimateDetails;

// import React from 'react';
// import { Formik, Form, Field } from 'formik';
// import { TextField, Container, Box, Typography, Grid, Button } from "@mui/material";

// const OrderEstimateDetails = ({ estimateData, handleUpdateEstimate }) => {
//   const handleSubmit = (values, { setSubmitting }) => {
//     handleUpdateEstimate(values);
//     setSubmitting(false);
//   };

//   return (
//     <Formik
//       initialValues={{
//         distance: estimateData?.distance || '',
//         duration: estimateData?.duration || '',
//         cost: estimateData?.cost || ''
//       }}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <Container maxWidth="lg" sx={{ height: "100vh" }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Box
//                   display="flex"
//                   justifyContent="center"
//                   alignItems="center"
//                   minHeight="100vh"
//                 >
//                   <div
//                     style={{
//                       width: "60%",
//                       margin: "auto",
//                       border: "1px solid #000000",
//                       borderRadius: "30px",
//                       padding: "48px",
//                       textAlign: "center",
//                     }}
//                   >
//                     <Typography
//                       variant="h5"
//                       component="h1"
//                       sx={{ textAlign: "center", m: 3 }}
//                     >
//                       Order Estimate Details
//                     </Typography>

//                     <div>
//                       <Field
//                         name="distance"
//                         as={TextField}
//                         label="Distance"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         disabled
//                       />
//                     </div>

//                     <div>
//                       <Field
//                         name="duration"
//                         as={TextField}
//                         label="Duration"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         disabled
//                       />
//                     </div>

//                     <div>
//                       <Field
//                         name="cost"
//                         as={TextField}
//                         label="Cost"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                       />
//                     </div>

//                     <Button
//                       sx={{ mt: 3 }}
//                       color="primary"
//                       variant="contained"
//                       type="submit"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? 'Updating...' : 'Update Estimate'}
//                     </Button>
//                   </div>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Container>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default OrderEstimateDetails;


import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Container, Box, Typography, Grid, Button } from "@mui/material";

const textFieldStyle = {
  width: '100%',
  marginBottom: '16px',
  padding: '8px',
  fontSize: '14px',
  boxSizing: 'border-box',
  borderRadius: '20px',
  border: '1px solid #1237BF',
};

const formItemStyle = {
  display: 'block',
  alignItems: 'start',
  textAlign: 'left',
};

const labelStyle = {
  width: '150px',
  marginRight: '16px',
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#1237BF',
};

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
                      sx={{ textAlign: "center", m: 1, color: '#1237BF', fontWeight: 'bold' }}
                    >
                      Order Estimate Details
                    </Typography>

                    <div style={formItemStyle}>
                      <label style={labelStyle} htmlFor="distance">Distance</label>
                      <input
                        name="distance"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled
                        style={textFieldStyle}
                        value={estimateData?.distance}

                      />
                    </div>

                    <div style={formItemStyle}>
                      <label style={labelStyle} htmlFor="duration">Duration</label>
                      <input
                        name="duration"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled
                        style={textFieldStyle}
                        value={estimateData?.duration}
                      />
                    </div>

                    <div style={formItemStyle}>
                      <label style={labelStyle} htmlFor="cost">Cost</label>
                      <input
                        name="cost"
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        style={textFieldStyle}
                      />
                    </div>

                    <Button
                      sx={{ mt: 3, background: "#1237BF", borderRadius: '8px', padding: '10px 30px' }}
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

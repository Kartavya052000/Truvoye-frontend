// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Container, Box, Typography, Grid, Button, TextField } from "@mui/material";
// import { post } from "../api/api";

// const SubmitOrder = ({ initialData, handleOrderSubmission }) => {
//   // Define Yup validation schema
//   const validationSchema = Yup.object().shape({
//     pickupDate: Yup.date().required('Pickup Date is required'),
//     sendersName: Yup.string().required('Sender\'s Name is required'),
//     sendersEmail: Yup.string().email('Invalid email').required('Sender\'s Email is required'),
//     receiversName: Yup.string().required('Receiver\'s Name is required'),
//     receiversEmail: Yup.string().email('Invalid email').required('Receiver\'s Email is required'),
//   });

//   // Handle form submission with Formik
//   const handleSubmit = async (values, { setSubmitting }) => {
//     const data = {
//       pickup_date: values.pickupDate,
//       pickup_address: {
//         address_name: initialData.pickupAddress,
//         pickup_lat: initialData.pickupCoords.lat,
//         pickup_lng: initialData.pickupCoords.lng,
//       },
//       receiver_address: {
//         address_name: initialData.receiverAddress,
//         receiver_lat: initialData.receiverCoords.lat,
//         receiver_lng: initialData.receiverCoords.lng,
//       },
//       weight: initialData.weight,
//       senders_name: values.sendersName,
//       senders_email: values.sendersEmail,
//       receivers_name: values.receiversName,
//       receivers_email: values.receiversEmail,
//     };

//     post("/orderDetails/SubmitOrder", data)
//       .then((response) => {
//         handleOrderSubmission(response.data);
//         setSubmitting(false);
//       })
//       .catch((error) => {
//         console.error("Error submitting data:", error);
//         setSubmitting(false);
//       });
//   };

//   const textFieldStyle = {
//     width: '100%',
//     marginBottom: '16px',
//   };

//   return (
//     <Formik
//       initialValues={{
//         pickupDate: '',
//         sendersName: '',
//         sendersEmail: '',
//         receiversName: '',
//         receiversEmail: '',
//       }}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting, handleChange }) => (
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
//                       Submit Order
//                     </Typography>

//                     <div>
//                       <Field
//                         name="pickupDate"
//                         as={TextField}
//                         type="date"
//                         // label="Pickup Date"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         onChange={handleChange}
//                         style={textFieldStyle}
//                       />
//                       <ErrorMessage name="pickupDate" component="div" className="error" />
//                     </div>

//                     <div>
//                       <Field
//                         name="sendersName"
//                         as={TextField}
//                         label="Sender's Name"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         onChange={handleChange}
//                         style={textFieldStyle}
//                       />
//                       <ErrorMessage name="sendersName" component="div" className="error" />
//                     </div>

//                     <div>
//                       <Field
//                         name="sendersEmail"
//                         as={TextField}
//                         type="email"
//                         label="Sender's Email"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         onChange={handleChange}
//                         style={textFieldStyle}
//                       />
//                       <ErrorMessage name="sendersEmail" component="div" className="error" />
//                     </div>

//                     <div>
//                       <Field
//                         name="receiversName"
//                         as={TextField}
//                         label="Receiver's Name"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         onChange={handleChange}
//                         style={textFieldStyle}
//                       />
//                       <ErrorMessage name="receiversName" component="div" className="error" />
//                     </div>

//                     <div>
//                       <Field
//                         name="receiversEmail"
//                         as={TextField}
//                         type="email"
//                         label="Receiver's Email"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         onChange={handleChange}
//                         style={textFieldStyle}
//                       />
//                       <ErrorMessage name="receiversEmail" component="div" className="error" />
//                     </div>

//                     <Button
//                       sx={{ mt: 3 }}
//                       color="primary"
//                       variant="contained"
//                       type="submit"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? 'Submitting...' : 'Submit Order'}
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

// export default SubmitOrder;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { post } from "../api/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const textFieldStyle = {
  marginTop: "8px",
  marginBottom: "24px",
  width: "100%",
  padding: "8px",
  fontSize: "16px",
  boxSizing: "border-box",
  borderRadius: "10px", // Adding border radius
  border: "1px solid #1237BF", // Adding a border
};

const formItemStyle = {
  display: "block",
  alignItems: "start",
  textAlign: "left",
};

const labelStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1237BF",
};

const validationSchema = Yup.object().shape({
  pickupDate: Yup.date().required("Pickup Date is required"),
  sendersName: Yup.string().required("Sender's Name is required"),
  sendersEmail: Yup.string()
    .email("Invalid email")
    .required("Sender's Email is required"),
  receiversName: Yup.string().required("Receiver's Name is required"),
  receiversEmail: Yup.string()
    .email("Invalid email")
    .required("Receiver's Email is required"),
});

const SubmitOrder = ({ initialData, handleOrderSubmission }) => {
  const navigate = useNavigate();
  // Function to get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed in JS
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      pickup_date: values.pickupDate,
      pickup_address: {
        address_name: initialData.pickupAddress,
        latitude: initialData.pickupCoords.lat,
        longitude: initialData.pickupCoords.lng,
      },
      receiver_address: {
        address_name: initialData.receiverAddress,
        latitude: initialData.receiverCoords.lat,
        longitude: initialData.receiverCoords.lng,
      },
      weight: initialData.weight,
      senders_name: values.sendersName,
      senders_email: values.sendersEmail,
      receivers_name: values.receiversName,
      receivers_email: values.receiversEmail,
      cost: initialData.cost,
      distance: initialData.distance,
      duration: initialData.duration,
    };

    console.log("Data we sending ===> ");
    console.log(data);

    post("/orderDetails/SubmitOrder", data)
      .then((response) => {
        handleOrderSubmission(response.data);
        setSubmitting(false);
        Swal.fire({
          title: "Order successfully added",
          icon: "success",
          iconColor: "blue",
          showConfirmButton: false,
          customClass: {
            // icon: 'custom-icon',
            title: "custom-title",
            content: "custom-content",
          },
          timer: 2000, // close after 2 seconds
        });
        navigate("/dashboard/orders");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{
        pickupDate: "2024-07-03",
        sendersName: "Khushal",
        sendersEmail: "khushal@gmail.com",
        receiversName: "Kartavya",
        receiversEmail: "Kartavyabhayana1@gmail.com",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleChange }) => (
        <Form>
          <Box
            sx={{
              width: { xs: "100%", sm: "80%", md: "60%", lg: "40%" },
              backgroundColor: "white",
              borderRadius: "20px",
              textAlign: "right",
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{
                textAlign: "left",
                p: "24px",
                color: "#1237BF",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              Submit Order
            </Typography>
            <Divider sx={{ bgcolor: "#F9A33F" }} />

            <Box
              sx={{
                paddingLeft: "24px",
                paddingTop: "24px",
                paddingRight: "24px",
              }}
            >
              <div style={formItemStyle}>
                <label htmlFor="pickupDate" style={labelStyle}>
                  Pickup Date
                </label>
                <Field
                  name="pickupDate"
                  as="input"
                  type="date"
                  style={textFieldStyle}
                />
                <ErrorMessage
                  name="pickupDate"
                  component="div"
                  className="error"
                />
              </div>

              <div style={formItemStyle}>
                <label htmlFor="sendersName" style={labelStyle}>
                  Sender's Name
                </label>
                <Field
                  name="sendersName"
                  as="input"
                  type="text"
                  style={textFieldStyle}
                />
                <ErrorMessage
                  name="sendersName"
                  component="div"
                  className="error"
                />
              </div>

              <div style={formItemStyle}>
                <label htmlFor="sendersEmail" style={labelStyle}>
                  Sender's Email
                </label>
                <Field
                  name="sendersEmail"
                  as="input"
                  type="email"
                  style={textFieldStyle}
                />
                <ErrorMessage
                  name="sendersEmail"
                  component="div"
                  className="error"
                />
              </div>

              <div style={formItemStyle}>
                <label htmlFor="receiversName" style={labelStyle}>
                  Receiver's Name
                </label>
                <Field
                  name="receiversName"
                  as="input"
                  type="text"
                  style={textFieldStyle}
                />
                <ErrorMessage
                  name="receiversName"
                  component="div"
                  className="error"
                />
              </div>

              <div style={formItemStyle}>
                <label htmlFor="receiversEmail" style={labelStyle}>
                  Receiver's Email
                </label>
                <Field
                  name="receiversEmail"
                  as="input"
                  type="email"
                  style={textFieldStyle}
                />
                <ErrorMessage
                  name="receiversEmail"
                  component="div"
                  className="error"
                />
              </div>
            </Box>
            <Divider sx={{ bgcolor: "#F9A33F" }} />

            <Button
              sx={{
                m: "24px",
                background: "#1237BF",
                borderRadius: "8px",
                padding: "10px 30px",
                textTransform: "none",
              }}
              color="primary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Order"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SubmitOrder;

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  TextField,
  Container,
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "../api/api";
import AlertMessage from "../components/AlertMessage";
import { useCookies } from 'react-cookie';
import Autocomplete from 'react-google-autocomplete';

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  username: yup
    .string("Enter your username")
    .required("Username is required"),
  address: yup
    .string("Enter your address")
    .required("Address is required"),
  phone: yup
    .string("Enter your phone number")
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Phone number should be of minimum 10 characters length")
    .required("Phone number is required"),
  truckLicensePlateNumber: yup
    .string("Enter your truck license plate number")
    .required("Truck license plate number is required"),
  driverLicense: yup
    .string("Enter your driver license")
    .required("Driver license is required"),
});

const EditDriver = () => {
  const [driver, setDriver] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  useEffect(() => {
    if (id) {
      fetchDriver(id);
    }
  }, [id]);

  const fetchDriver = async (id) => {
    try {
      const response = await post(`/driver/get/${id}`);
      let { data } = response;
      data = data.driver;
      console.log(data);
      if (data) {
        setDriver(data);
        formik.setValues({
          email: data.email,
          username: data.username,
          address: data.address.formatted_address,  // use formatted_address as string
          pickupCoords: { 
          lat: data.address.latitude, 
          lng: data.address.longitude 
        },
          
        //   address: {
        //     formatted_address: data.address.formatted_address,
        //     latitude: data.address.latitude,
        //     longitude: data.address.longitude,
        //   },
          phone: data.phone,
          truckLicensePlateNumber: data.truckLicensePlateNumber,
          driverLicense: data.driverLicense
        });
      } else {
        console.error("Driver data not found");
      }
    } catch (error) {
      //console.error("Error fetching driver:", error);
      console.error("Error fetching driver:", error.response ? error.response.data : error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      address: '',
      pickupCoords: { lat: null, lng: null },
      phone: '',
      truckLicensePlateNumber: '',
      driverLicense: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        username: values.username,
        address: {
        formatted_address: values.address,
        latitude: values.pickupCoords.lat,
        longitude: values.pickupCoords.lng,
      },
        phone: values.phone,
        truckLicensePlateNumber: values.truckLicensePlateNumber,
        driverLicense: values.driverLicense
      };

      try {
        const response = await post(`/driver/edit/${id}`, data);
        if (response.status === 200 || response.status === 201) {
          setAlertMessage(["success", `Driver ${id ? "updated" : "added"} successfully`]);
          navigate('/dashboard/drivers');
        } else {
          setAlertMessage(["error", "Something went wrong, contact support"]);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        if (error.response && error.response.status === 400) {
          setAlertMessage(["error", "Invalid data provided"]);
        } else {
          setAlertMessage(["error", "Something went wrong, contact support"]);
        }
      }
    },
  });

  const textFieldStyle = {
    width: '100%',
    marginBottom: '16px',
    padding: '10px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    fontSize: '16px',
  };

  return (
    <div className="edit-driver">
      <Container maxWidth="lg" sx={{ height: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <form
                style={{
                  width: "60%",
                  margin: "auto",
                  border: "1px solid #000000",
                  borderRadius: "30px",
                  padding: "48px",
                  textAlign: "center",
                }}
                onSubmit={formik.handleSubmit}
              >
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{ textAlign: "center", m: 3 }}
                >
                  {id ? "Edit Driver" : "Add New Driver"}
                </Typography>

                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  size="small"
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  size="small"
                  margin="normal"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />

                <div>
                  <Autocomplete
                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    onPlaceSelected={(place) => {
                      const address = place.formatted_address;
                      const lat = place.geometry.location.lat();
                      const lng = place.geometry.location.lng();
                      formik.setFieldValue('address', address);
                      formik.setFieldValue('pickupCoords', { lat, lng });
                    }}
                    types={['address']}
                    placeholder="Enter Address"
                    style={textFieldStyle}
                    value={formik.values.address}  // Ensure the value prop is set
                    onChange={(e) => formik.setFieldValue('address', e.target.value)}
                  />
                  <AlertMessage name="address" component="div" className="error" />
                </div>

                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  size="small"
                  margin="normal"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />

                <TextField
                  fullWidth
                  id="truckLicensePlateNumber"
                  name="truckLicensePlateNumber"
                  label="Truck License Plate Number"
                  size="small"
                  margin="normal"
                  value={formik.values.truckLicensePlateNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.truckLicensePlateNumber && Boolean(formik.errors.truckLicensePlateNumber)}
                  helperText={formik.touched.truckLicensePlateNumber && formik.errors.truckLicensePlateNumber}
                />

                <TextField
                  fullWidth
                  id="driverLicense"
                  name="driverLicense"
                  label="Driver License"
                  size="small"
                  margin="normal"
                  value={formik.values.driverLicense}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.driverLicense && Boolean(formik.errors.driverLicense)}
                  helperText={formik.touched.driverLicense && formik.errors.driverLicense}
                />

                <Button
                  sx={{ mt: 3 }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  {id ? "Update Driver" : "Add Driver"}
                </Button>

                <AlertMessage alertMessage={alertMessage} />
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EditDriver;

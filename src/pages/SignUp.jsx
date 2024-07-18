import React from "react";
import '../styles/Login.css';
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { borders } from '@mui/system';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import { post } from "../api/api";
import config from "../config/config";
import AlertMessage from "../components/AlertMessage";
import BoyImg from '../Assets/imagesB/Boy.png';
import { Boy } from "@mui/icons-material";



const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  firstName: yup.string("Enter First Name").required("First Name is required"),
  lastName: yup.string("Enter Last Name").required("Last Name is required"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState([null]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      //   alert(JSON.stringify(values, null, 2));
      console.log(config.BASE_SERVER_URL);

      let data = {
        username: values.firstName + " " + values.lastName,
        email: values.email,
        password: values.password,
      };

      post("auth/signup", data)
        .then((response) => {
          console.log("Data submitted:", response.data);
          if (response.status === 201) {
            setAlertMessage([
              "success",
              "Verification link sent to your registered email",
            ]);
          }
          else if (response.status === 200) {
            setAlertMessage(["error", "Email already registered use Login"]);
          } else {
            setAlertMessage(["error", "Something Went Wrong contact support"]);
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
          const response = error.response;

          console.log(response);

          setAlertMessage(["error", "Something Went Wrong contact support"]);
        });

    

    },
  });

  return (
    <div className="signUp">
      <Container maxWidth="x-lg" sx={{ height: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{mx:"auto"}}><Box sx={{mx:"auto"}}><img src={BoyImg} alt="Banner-illustration" /></Box></Grid>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              flexDirection="column"
            >
              <form
                style={{
                  width: "80%",
                  margin: "auto",
                  border: "1px solid #1237BF",
                  borderRadius: "30px",
                  padding: "48px",
                  textAlign: "center",
                }}
                onSubmit={formik.handleSubmit}
              >
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{ textAlign: "center", m: 3, color:"#1237BF" }}
                >
                  Well, Hello There !
                </Typography>

                <FormControl fullWidth>
  <Typography variant="caption" component="h2" sx={{ color: "#1237BF", fontSize: 14, fontWeight: "bold", textAlign:"left"}}>
Firstname
  </Typography>
  <TextField
                        margin="dense"
                        fullWidth
                        id="firstName"
                        name="firstName"
                        size="small"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }/>
</FormControl>

                    <FormControl fullWidth>
  <Typography variant="caption" component="h2" sx={{ color: "#1237BF", fontSize: 14, fontWeight: "bold", textAlign:"left"}}>
Lastname
  </Typography>
  <TextField
                        margin="dense"
                        fullWidth
                        id="lastName"
                        name="lastName"
                        size="small"

                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }

                      />
</FormControl>   

<FormControl fullWidth>
  <Typography variant="caption" component="h2" sx={{ color: "#1237BF", fontSize: 14, fontWeight: "bold", textAlign:"left"}}>
Email
  </Typography>
  <TextField
                  margin="dense"
                  fullWidth
                  id="email"
                  name="email"
      
                  size="small"
                  className="Signup-box"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
</FormControl>   


               

                <FormControl
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  error={
                    formik.errors.password && Boolean(formik.errors.password)
                  }
                >
                    <Typography variant="caption" component="h2" sx={{ color: "#1237BF", fontSize: 14, fontWeight: "bold", textAlign:"left"}}>
Password
  </Typography>
                    
                  
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    name="password"
                    size="small"
                    margin="normal"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                  />

                  {formik.touched.password && formik.errors.password && (
                    <FormHelperText error>
                      {formik.errors.password}
                    </FormHelperText>
                  )}
                </FormControl>

                {/* Confirm Password from here  */}
                <FormControl
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  error={
                    formik.errors.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                >
                  <Typography variant="caption" component="h2" sx={{ color: "#1237BF", fontSize: 14, fontWeight: "bold", textAlign:"left"}}>
Confirm Password
  </Typography>
                  <OutlinedInput
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    name="confirmPassword"
                    
                    size="small"
                    margin="normal"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <FormHelperText error>
                        {formik.errors.confirmPassword}
                      </FormHelperText>
                    )}
                </FormControl>

                <Button
                  sx={{ mt: 4, mb: 3, bgcolor:"#1237BF", width:"70%"}}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Create Account
                </Button>

                <Typography variant="caption" component="h2" align="center">
                  Already have an account -
                  <Button color="primary" variant="text" onClick={onLoginClick}>
                    <Typography
                      variant="caption"
                      component="h2"
                      sx={{ fontWeight: "700" }}
                    >
                      Login
                    </Typography>
                  </Button>
                </Typography>

                <AlertMessage alertMessage={alertMessage} />
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SignUp;

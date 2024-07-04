import React from "react";
import '../styles/Login.css'
import loginIllustration from '../Assets/imagesV/logIn.png';

import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AlertMessage from "../components/AlertMessage";
import { post } from "../api/api";
import { useCookies } from 'react-cookie';

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [isForgotPasswordDialogOpen, setIsForgotPasswordDialogOpen] =
    React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState([]);
  const [dialogAlertMessage, setDialogAlertMessage] = React.useState([]);
  const [, setCookie, ] = useCookies(["token"]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const navigate = useNavigate();

  const onSignUpClick = (event) => {
    navigate("/signup");
  };

  const onForgotPasswordClick = (event) => {
    setIsForgotPasswordDialogOpen(true);
  };

  const handleForgotPasswordDialogClose = () => {
    setIsForgotPasswordDialogOpen(false);
    setDialogAlertMessage([])
  };

  const onForgotPasswordDialogSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;

    post("auth/forget-password", {email : email})
      .then((response) => {
        console.log("DATA FROM Forget password ", response);
        if (response.status === 200) {
          setDialogAlertMessage(["success", response.data.message]);

          setTimeout(handleForgotPasswordDialogClose, 3000);
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        const response = error.response;

        if (response.status === 404) {
          setDialogAlertMessage(["error", "User not found related to that email"]);
        } else {
          setDialogAlertMessage(["error", "Something Went Wrong contact support"]);
        }
      });


     navigate("/forgotpassword");
  };

  // TODO : get the state of the check from here
  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
      onSubmit: (values) => {
        post("auth/login", values)
          .then((response) => {
            console.log("DATA FROM LOGIN ", response);
            if (response.status === 201) {
              setCookie('token', response.data.token, { path: '/' }); 
              
              navigate("/dashboard"); 
              setAlertMessage(["success", "User logged in successfully"]);
              
            } else if (response.status === 200) {
              setAlertMessage(["error", response.data.message]);
            } else {
              setAlertMessage(["error", "Something Went Wrong contact support"]);
            }
          })
          .catch((error) => {
            console.error("Error submitting data:", error);
            const response = error.response;

            console.log(response);
            if (response.status === 404) {
              setAlertMessage(["error", "Incorrect password or email"]);
            } else {
              setAlertMessage(["error", "Something Went Wrong contact support"]);
            }
          });
      },
  });

  

  return (
    <div className="login">
      {/* <div className="left-column">
      <img src={loginIllustration} alt="login-illustration"/>
      </div> */}
      
        <Container maxWidth="lg" sx={{ height: "100vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
              >
                <Dialog
                  open={isForgotPasswordDialogOpen}
                  onClose={handleForgotPasswordDialogClose}
                  PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                      onForgotPasswordDialogSubmit(event);
                    },
                  }}
                >
                  <DialogTitle>Forgot Password</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Enter your email below we will send you password reset link
                    </DialogContentText>
                    <TextField
                      autoFocus
                      required
                      margin="normal"
                      id="name"
                      name="email"
                      label="Email Address"
                      type="email"
                      fullWidth
                      size="small"
                      variant="outlined"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleForgotPasswordDialogClose}>
                      Cancel
                    </Button>
                    <Button type="submit">OK</Button>
                  </DialogActions>
        
                  <AlertMessage alertMessage={dialogAlertMessage} />
                </Dialog>
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
                    Welcome Back !
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
                  <Typography
                    align="right"
                    variant="caption"
                    component="h2"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={onForgotPasswordClick}
                  >
                    Forgot Password ?
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={
                      formik.errors.password && Boolean(formik.errors.password)
                    }
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      size="small"
                    >
                      Password
                    </InputLabel>
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
                      label="Password"
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
                  {/* TODO: Design Issue - FromControlLable is messing with the width of the container here  - Khushal @ 16/06 7:42PM */}
                  <Box
                    sx={{
                      display: "flex",
                      mt: 1,
                      mb: 1,
                      justifyContent: "center",
                    }}
                  >
                    <FormControlLabel
                      label={
                        <Typography variant="caption" component="h2">
                          Remember Me
                        </Typography>
                      }
                      control={
                        <Checkbox
                          size="small"
                          checked={checked}
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={handleChange}
                        />
                      }
                    />
                  </Box>
                  <Button
                    sx={{ mt: 1, mb: 4 }}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Typography variant="caption" component="h2" align="center">
                    New Here? Create an Account -
                    <Button
                      color="primary"
                      variant="text"
                      onClick={onSignUpClick}
                    >
                      <Typography
                        variant="caption"
                        component="h2"
                        sx={{ fontWeight: "700" }}
                      >
                        Sign Up
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

//#fccff4 //#fcd4cf // #fccff6
export default Login;
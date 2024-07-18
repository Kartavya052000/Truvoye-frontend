import React from "react";
import TextField from "@mui/material/TextField";
import Truck from "../../Assets/imagesB/Truck.svg";
import { Grid } from '@mui/material';


import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import { post } from "../../api/api";
import AlertMessage from "../../components/AlertMessage";
import { useCookies } from "react-cookie";
import ButtonGroupComponent from "../../components/ButtonGroupComponent";

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
  const [, setCookie] = useCookies(["token"]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const navigate = useNavigate();

  const onForgotPasswordClick = (event) => {
    setIsForgotPasswordDialogOpen(true);
  };

  const handleForgotPasswordDialogClose = () => {
    setIsForgotPasswordDialogOpen(false);
    setDialogAlertMessage([]);
  };

  const onForgotPasswordDialogSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;

    post("driver/forget-password", { email: email })
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
          setDialogAlertMessage([
            "error",
            "User not found related to that email",
          ]);
        } else {
          setDialogAlertMessage([
            "error",
            "Something Went Wrong contact support",
          ]);
        }
      });

    // navigate("/forgotpassword");
  };

  // TODO : get the state of the check from here
  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      post("driver/login", values)
        .then((response) => {
          console.log("DATA FROM LOGIN ", response);
          if (response.status === 201) {
            setAlertMessage(["success", "User logged in successfully"]);
            // setCookie('driver_token', response.data.token, { path: '/' });
            setCookie("token", response.data.token, { path: "/" });
            navigate("/driver/jobsheet");
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
          } else if (response.status === 401) {
            setAlertMessage(["error", response.data.message]);
          }
        });
    },
  });
  const buttons = [
    { name: "Manager", link: "/login", active: false },
    { name: "Driver", link: "/driver/login", active: true },
  ];
  return (
    <div className="login">
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        minHeight="90vh"  
        paddingTop="3rem"
      >
         <Dialog
                  open={isForgotPasswordDialogOpen}
                  onClose={handleForgotPasswordDialogClose}
                  PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                      onForgotPasswordDialogSubmit(event);
                    },
                    sx: {
                      width: "400px",
                      height: "210px",
                    },
                  }}
                >
                  <DialogTitle
                    sx={{
                      color: "#1237BF",
                      fontSize: 27,
                      fontFamily: "Outfit",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    Forgot Password
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      sx={{
                        color: "#1237BF",
                        fontSize: 20,
                        fontFamily: "Outfit",
                        fontWeight: "700",
                        wordWrap: "break-word",
                      }}
                    >
                      Enter Email
                    </DialogContentText>

                    <OutlinedInput
                      autoFocus
                      required
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      sx={{
                        border: "1px solid #1237BF",
                        borderRadius: "25px",
                        height: "45px", // Adjust height to reduce overall height
                        padding: 0, // Remove padding
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleForgotPasswordDialogClose}
                      className="btn login-btn"
                    >
                      Cancel
                    </Button>
                    {/* <Link to="/signup" >Sign Up</Link> */}

                    <Button type="submit" className="btn signup-btn">
                      Send
                    </Button>
                  </DialogActions>

                  <AlertMessage alertMessage={dialogAlertMessage} />
                </Dialog>
        <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{mx:"auto"}}><Box sx={{mx:"auto"}}><img src={Truck} alt="Truck-illustration" fullWidth/></Box></Grid>
      

<Grid item xs={12} md={6} justifyContent="center">
          <div className="wrapper_login_buttons">
<ButtonGroupComponent buttons={buttons} activeButton="Driver" sx={{justifyContent:"center"}} />
        <form
          style={{
            width: "92%",
            margin: "auto",
            border: "1px solid #1237BF",
            borderRadius: "30px",
            padding: "32px",
            textAlign: "center",
          }}
          onSubmit={formik.handleSubmit}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{ textAlign: "center", m: 3,color: "#1237BF"  }}
          >
            Well, Hello There !
          </Typography>

          <FormControl fullWidth>
  <Typography variant="caption" component="h2" sx={{ color: "#1237BF", fontSize: 14, fontWeight: "bold", textAlign:"left"}}>
    Email
  </Typography>
  <TextField
    fullWidth
    id="email"
    name="email"
    labelPlacement="top"
    size="small"
    margin="normal"
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.email && Boolean(formik.errors.email)}
    helperText={formik.touched.email && formik.errors.email}
  />
</FormControl>

          <Typography
            align="right"
            variant="caption"
            component="h2"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={onForgotPasswordClick}
          >
            Forgot Password ?
          </Typography>

          <FormControl fullWidth variant="outlined" error={formik.errors.password && Boolean(formik.errors.password)}>
  <Typography variant="caption" component="h2" sx={{ color: "#1237BF", fontSize: 14, fontWeight: "bold",textAlign:"left" }}>
    Password
  </Typography>
  <OutlinedInput
    id="outlined-adornment-password"
    type={showPassword? "text" : "password"}
    endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
    name="password"
    label="Password"
    size="small"
    labelPlacement="top"
    margin="normal"
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />

  {formik.touched.password && formik.errors.password && (
    <FormHelperText error>{formik.errors.password}</FormHelperText>
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
            sx={{ mt: 1, mb: 4, bgcolor: "#1237BF", width: "70%" }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Login
          </Button>

          <AlertMessage alertMessage={alertMessage} />
        </form>
        </div>

        </Grid>
        </Grid>
       
      </Box>
    </div>
  );
};

export default Login;

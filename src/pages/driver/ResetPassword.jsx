import React from "react";
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
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "../../api/api";
import AlertMessage from "../../components/AlertMessage";

const validationSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { token } = useParams();
  const [alertMessage, setAlertMessage] = React.useState([]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate("/driver/login");
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (token) {
        post("driver/reset-password/" + token, { newPassword: values.password })
          .then((response) => {
            console.log("DATA FROM reset password ", response);
            if (response.status === 200) {
              setAlertMessage(["success","Password Reset Was Successful"]);

              setTimeout(onLoginClick, 3000);
            } else if (response.status === 201){
                setAlertMessage(["success","Welcome"]);
                navigate("/driver/home");
            } else {
              setAlertMessage([
                "error",
                "Something Went Wrong contact support",
              ]);
            }
          })
          .catch((error) => {
            console.error("Error submitting data:", error);
            const response = error.response;
            if (response.status === 401) {
              setAlertMessage(["error", "Invalid Url"]);
            } else if (response.status === 500) {
              setAlertMessage([
                "error",
                "Something Went Wrong contact support",
              ]);
            }
          });
      }
    },
  });

  return (
    <div className="resetPassword">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90vh"
      >
        <form
          style={{
            width: "70%",
            margin: "auto",
            border: "1px solid #000000",
            borderRadius: "30px",
            padding: "32px",
            textAlign: "center",
          }}
          onSubmit={formik.handleSubmit}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{ textAlign: "center", m: 3 }}
          >
            Reset Password
          </Typography>

          <FormControl
            margin="dense"
            fullWidth
            variant="outlined"
            error={formik.errors.password && Boolean(formik.errors.password)}
          >
            <InputLabel htmlFor="outlined-adornment-password" size="small">
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
              <FormHelperText error>{formik.errors.password}</FormHelperText>
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
            <InputLabel htmlFor="confirmPassword" size="small">
              Confirm Password
            </InputLabel>
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
              label="Confirm Password"
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
            sx={{ mt: 3, mb: 3 }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Reset
          </Button>

          <Typography variant="caption" component="h2" align="center">
            Change of mind ? -
            <Button color="primary" variant="text" onClick={onLoginClick}>
              <Typography
                variant="caption"
                component="h2"
                sx={{ fontWeight: "700" }}
              >
                login
              </Typography>
            </Button>
          </Typography>
          <AlertMessage alertMessage={alertMessage} />
        </form>
      </Box>
    </div>
  );
};

export default ResetPassword;

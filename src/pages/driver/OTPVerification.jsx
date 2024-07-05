import React, { useState, useRef } from "react";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WarningAmberRounded } from "@mui/icons-material";
import { post } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [hasError, setHasError] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState([]);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    const { key } = event;
    if (!/[0-9]/.test(key)) {
      event.preventDefault();
    }
  };

  const handleChange = (event, index) => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain").trim();

    // Check if pasted data is exactly 4 digits
    if (/^\d{4}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);

      // Move focus to the next input box after pasting
      inputRefs[newOtp.length - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    if (otp.includes("")) {
      setHasError(true);
    } else {
      setHasError(false);
      const fullOtp = otp.join("");
      console.log("Full OTP:", fullOtp);
      if (!orderId) {
        setAlertMessage(["error", "Invalid link"]);
      }

      post(`driver/verifyOTP?orderId=${orderId}`, { otp: fullOtp })
        .then((response) => {
          if (response.status === 201) {
            console.log(response);

            setAlertMessage(["success", "OTP Verified Delivery Confirmed"]);
            setTimeout(()=>{
navigate("/driver/jobsheet")
            },2000)
          }
        })
        .catch((error) => {
          console.log("MAYDAY! MAYDAY! MAYDAYYY!!!!");
          console.error("Error updating order status:", error);
// navigate("/driver/jobsheet")

          if(error.response.status === 401){
            setAlertMessage(["error", "The OTP entered is invalid"]);

          }else{
            setAlertMessage(["error", "Something Went Wrong contact support"]);

          }
        });
      //   setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="otp-verification" style={{ height: "90vh" }}>
      <AlertMessage alertMessage={alertMessage} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
          gap: 4,
        }}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle
            id="alert-dialog-title"
            sx={{ textAlign: "center", color: "red" }}
          >
            {"Error"}
          </DialogTitle> */}
          <DialogContent sx={{ textAlign: "center" }}>
            {/* import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'; */}
            <WarningAmberRounded sx={{ fontSize: "48px", color: "red" }} />

            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "red" }}
            >
              <b>
                Incorrect Type <br /> Please try again
              </b>
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions> */}
        </Dialog>

        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          <b>OTP Verification</b>
        </Typography>

        <Grid container spacing={2} sx={{ width: "80%" }} pt={2}>
          {inputRefs.map((ref, index) => (
            <Grid item xs={3} key={index}>
              <TextField
                id={`otp-field-${index}`}
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "24px" },
                }}
                onPaste={handlePaste}
                onKeyPress={handleKeyPress}
                onChange={(e) => handleChange(e, index)}
                inputRef={ref}
                value={otp[index]}
                error={hasError && otp[index] === ""}
                // helperText={hasError && otp[index] === '' ? 'Required' : ''}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:
                        hasError && otp[index] === "" ? "red" : "default",
                    },
                    "&:hover fieldset": {
                      borderColor:
                        hasError && otp[index] === "" ? "red" : "default",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor:
                        hasError && otp[index] === "" ? "red" : "default",
                    },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="subtitle1"
          component="h3"
          sx={{ mt: 2, textAlign: "center", width: "60%" }}
        >
          Enter OTP given by the recipient to confirm delivery
        </Typography>

        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default OTPVerification;

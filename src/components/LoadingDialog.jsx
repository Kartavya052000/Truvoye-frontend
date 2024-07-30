import React from "react";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import loadingGif from "../Assets/imagesG/TruckAnimationTruvoey.gif";

const LoadingDialog = ({ open, loadingText }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding:"24px"
          }}
        >
          <img
            src={loadingGif}
            alt="Loading..."
          />
          <Box mt={2}>
            <Typography variant="h6">{loadingText}</Typography>
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;

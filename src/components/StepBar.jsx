import React from 'react';
import { Box, Typography } from '@mui/material';

const StepBar = ({ step }) => {
  // Define the clip-paths for each step value
  const clipPaths = {
    1: 'polygon(100% 0%, 100% 100%, 28% 100%, 37% 50%, 28% 0%)',
    2: 'polygon(100% 0%, 100% 100%, 61% 100%, 70% 50%, 61% 0%)',
    3: 'polygon(100% 0%, 100% 100%, 100% 100%, 100% 50%, 100% 0%)',
  };

  return (
    <Box
      sx={{
        borderRadius: "20px",
        width: { xs: "100%", sm: "80%", md: "70%", lg: "50%" },
        display: "flex",
        border: "2px solid #F9A33F",
        position: "relative",
      }}
    >
        {console.log("What are the steps : " + step)}
      <Box
        sx={{
          backgroundColor: "#1237BF",
          borderRadius: "20px",
          position: "relative",
          width: "100%",
          display: "flex",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontSize: "18px",
            color: "#FFF",
            fontWeight: "700",
            padding: "10px 0",
          }}
        >
          Proposal Details
        </Typography>

        <Typography
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontSize: "18px",
            color: "#FFF",
            fontWeight: "700",
            padding: "10px 0",
          }}
        >
          Proposal Details
        </Typography>

        <Typography
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontSize: "18px",
            color: "#FFF",
            fontWeight: "700",
            padding: "10px 0",
          }}
        >
          Proposal Details
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          borderRadius: "20px",
          backgroundColor: "white",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          clipPath: clipPaths[step] || clipPaths[1], // Default to step 1 if step is invalid
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontSize: "18px",
            color: "#D1CDCD",
            fontWeight: "700",
            padding: "10px 0",
          }}
        >
          Proposal Details
        </Typography>

        <Typography
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontSize: "18px",
            color: "#D1CDCD",
            fontWeight: "700",
            padding: "10px 0",
          }}
        >
          Proposal Details
        </Typography>

        <Typography
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontSize: "18px",
            color: "#D1CDCD",
            fontWeight: "700",
            padding: "10px 0",
          }}
        >
          Proposal Details
        </Typography>
      </Box>
    </Box>
  );
};

export default StepBar;

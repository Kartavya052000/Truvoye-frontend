import React, { useState } from "react";

import OrderEstimate from "../components/OrderEstimate";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OrderEstimateDetails from "../components/OrderEstimateDetails";
import SubmitOrder from "../components/SubmitOrder";
import proposalStage1 from "../Assets/imagesB/proposalStage1.png";
import proposalStage2 from "../Assets/imagesB/proposalStage2.png";
import proposalStage3 from "../Assets/imagesB/proposalStage3.png";
import { useMediaQuery } from "@mui/system";

const OrderProposal = () => {
  const steps = ["Order Estimate", "Get Estimates", "Submit Order"];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [estimateData, SetEstimateData] = useState({});
  const isMobile = useMediaQuery("(min-width:600px)");
  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleGetEstimate = (value) => {
    console.log(value, "vv");
    SetEstimateData(value);
    console.log(estimateData, "eee");
    setActiveStep(1);
    //  alert(activeStep)
  };
  const handleUpdateEstimate = (value) => {
    SetEstimateData((prevData) => {
      const updatedData = { ...prevData, ...value };
      console.log(updatedData, "updated estimate data");
      return updatedData;
    });
    setActiveStep(2);
  };
  const handleOrderSubmission = () => {
    // alert("order is submitted")
  };

  const getImage = (step) => {
    switch (step) {
      case 0:
        return proposalStage1;
      case 1:
        return proposalStage2;
      case 2:
        return proposalStage3;
      default:
        return proposalStage1;
    }
  };

  return (
    <Box sx={{m:{sm:"16px"}}}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          paddingBottom: "18px",
        }}
      >
        {isMobile ? (
          <img
            src={getImage(activeStep)}
            alt="proposal stage"
            style={{ margin: "auto" }}
          ></img>
        ) : (
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              // if (isStepSkipped(index)) {
              //   stepProps.completed = false;
              // }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        )}
      </Box>
      {activeStep === 0 && (
        <Box sx={{ mt: 2 }}>
          <OrderEstimate handleGetEstimate={handleGetEstimate} />
        </Box>
      )}
      {activeStep === 1 && (
        <Box sx={{ mt: 2 }}>
          <OrderEstimateDetails
            estimateData={estimateData}
            handleUpdateEstimate={handleUpdateEstimate}
          />
        </Box>
      )}
      {activeStep === 2 && (
        <Box sx={{ mt: 2 }}>
          <SubmitOrder
            initialData={estimateData}
            handleOrderSubmission={handleOrderSubmission}
          />
        </Box>
      )}

      {/* {estimation && (
        <div>
          <h3>Order Estimation</h3>
          <p>Cost: {estimation.distance}</p>
          <p>Time: {estimation.time}</p>
        </div>
      )} */}

      {/* TODO : for future [ > > ] */}
      {/* <Box
        sx={{
          margin: "16px",
          borderRadius: "20px",
          width: "50%",
          display: "flex",
          border: "2px solid #F9A33F",
          position: "relative",
        }}
      >
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
              padding: "10px 0", // Adjust padding as needed
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
              padding: "10px 0", // Adjust padding as needed
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
              padding: "10px 0", // Adjust padding as needed
            }}
          >
            Proposal Details
          </Typography>
        </Box>

        <Box
          sx={{
            display:"flex",
            borderRadius: "20px",
            backgroundColor: "white",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            clipPath: "polygon(100% 0%, 100% 100%, 28% 100%, 37% 50%, 28% 0%);",
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
              padding: "10px 0", // Adjust padding as needed
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
              padding: "10px 0", // Adjust padding as needed
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
              padding: "10px 0", // Adjust padding as needed
            }}
          >
            Proposal Details
          </Typography>
        </Box>
      </Box> */}
    </Box>
  );
};

export default OrderProposal;

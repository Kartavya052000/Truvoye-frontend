import React, { useState } from 'react';

import OrderEstimate from '../components/OrderEstimate';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OrderEstimateDetails from '../components/OrderEstimateDetails';
import SubmitOrder from '../components/SubmitOrder';

const OrderProposal = () => {
  const steps = ['Order Estimate', 'Get Estimates', 'Submit Order'];

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [estimateData,SetEstimateData] = useState({});
  const isStepOptional = (step) => {
    return step === 1;
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
  const handleGetEstimate = (value) =>{
    console.log(value,"vv")
   SetEstimateData(value)
   console.log(estimateData,"eee")
   setActiveStep(1)
//  alert(activeStep)

  }
const handleUpdateEstimate = ()=>{
  setActiveStep(2)
  

}
  const handleOrderSubmission = () =>{
    alert("order is submitted")
  }
  return (
    <div>
   <Box sx={{ width: '100%' }}>
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
    </Box>
    {activeStep === 0 && (
              <Box sx={{ mt: 2 }}>
                <OrderEstimate handleGetEstimate ={handleGetEstimate}/>
              </Box>
            )}
            {activeStep === 1 && (
              <Box sx={{ mt: 2 }}>
                <OrderEstimateDetails estimateData={estimateData} handleUpdateEstimate={handleUpdateEstimate} />
              </Box>
            )}
            {activeStep === 2 && (
              <Box sx={{ mt: 2 }}>
          <SubmitOrder initialData={estimateData} handleOrderSubmission={handleOrderSubmission} />
              </Box>
            )}

      {/* {estimation && (
        <div>
          <h3>Order Estimation</h3>
          <p>Cost: {estimation.distance}</p>
          <p>Time: {estimation.time}</p>
        </div>
      )} */}

      
    </div>
  );
};

export default OrderProposal;

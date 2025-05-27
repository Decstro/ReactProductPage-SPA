import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentStep, resetPaymentStep } from '../../redux/transaction/transactionSlice';
import { Stepper, Step, StepLabel, Box, } from '@mui/material';
import { styled } from '@mui/material/styles';
import PaymentForm from './PaymentForm';
import PaymentSummary from './PaymentSummary';
import PaymentResult from './PaymentResult';

const steps = ['Payment Details', 'Review Order', 'Payment Result'];

const PaymentStepper = () => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector(state => state.transactions);
  const { currentTransaction } = useSelector(state => state.transactions);

  const handleNext = () => {
    dispatch(setPaymentStep(currentStep + 1));
  };

  const handleBack = () => {
    dispatch(setPaymentStep(currentStep - 1));
  };

  const handleReset = () => {
    dispatch(resetPaymentStep());
  };

  const getStepContent = (step) => {
    switch (step) {
    case 0:
      return <PaymentForm onSuccess={handleNext} />;
    case 1:
      return <PaymentSummary
        onBack={handleBack}
        onSubmit={handleNext}
        transaction={currentTransaction}
      />;
    case 2:
      return <PaymentResult onResetStep={handleReset} />;
    default:
      return <PaymentForm onSuccess={handleNext} />;
    }
  };

  const StepperContainer = styled(Box)({
    width: '100%',
    height: 'calc(90vh - 200px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  });

  return (
    <StepperContainer>
      <Stepper
        activeStep={currentStep}
        alternativeLabel
        sx={{
          mb: 3,
          flexShrink: 0, // Prevent stepper from shrinking
          '& .MuiStepLabel-root .Mui-completed': {
            color: 'rgb(40, 201, 40)'
          },
          '& .MuiStepLabel-root .Mui-active': {
            color: 'rgb(40, 201, 40)'
          }
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' } // Responsive labels
                }
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 1, // Add horizontal padding
          pb: 2 // Bottom padding for scroll
        }}
      >
        {getStepContent(currentStep)}
      </Box>
    </StepperContainer>
  );
};

export default PaymentStepper;

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';

const PaymentSummary = ({ onBack, onSubmit }) => {
  return (
    <Box>
      {/* Display transaction summary */}
      <Button onClick={onBack}>Back</Button>
      <Button
        variant="contained"
        onClick={onSubmit}
        sx={{ ml: 2 }}
      >
        Confirm Payment
      </Button>
    </Box>
  );
};

PaymentSummary.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PaymentSummary;



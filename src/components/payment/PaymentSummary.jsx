import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Box, Button, Divider, Typography, Stack  } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ConfirmPaymentBackdrop from './ComfirmPaymentBackdrop';


// Fixed fees
const baseFee = 2.5;
const deliveryFee = 5.0;

const PaymentSummary = ({ onBack, onSubmit }) => {
  const { currentTransaction } = useSelector(state => state.transactions);
  const { selectedProduct } = useSelector(state => state.products);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Calculate fees and totals
  const originalAmount = currentTransaction?.amount || 0;
  const newTotal = originalAmount + baseFee + deliveryFee;


  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  return (
    <>
      <ConfirmPaymentBackdrop
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onSubmit={onSubmit}
        amount={newTotal}
      />

      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          maxWidth: 420,
          mx: 'auto',
          background: 'transparent',
          color: '#222',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} color="text.primary">
        Order Summary
        </Typography>

        {/* Product Information */}
        <Box display="flex" mb={3} gap={2}>
          <Box
            component="img"
            src={selectedProduct?.images[0]?.imgPath || ''}
            alt={selectedProduct?.name}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 1,
              objectFit: 'cover',
              border: '1px solid',
              borderColor: 'divider'
            }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
              {selectedProduct?.name || 'Product'}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {selectedProduct?.description || 'Product description'}
            </Typography>
            <Typography variant="body1" color="text.primary" fontWeight="medium">
            ${originalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2} mb={3}>
          <Divider sx={{ my: 1 }} />

          {/* Fees Breakdown */}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">Base Fee:</Typography>
            <Typography variant="body1" color="text.primary">${baseFee.toFixed(2)}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="text.secondary" mr={1}>Delivery Fee:</Typography>
              <DirectionsBusIcon fontSize="small" sx={{ color: 'rgb(34, 164, 34)' }} />
            </Box>
            <Typography variant="body1" color="text.primary">${deliveryFee.toFixed(2)}</Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Total */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.primary"
            >
              Total to Pay:
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="success.main"
            >
            ${newTotal.toFixed(2)}
            </Typography>
          </Box>
        </Stack>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            onClick={onBack}
            variant="outlined"
            color="inherit"
            sx={{ minWidth: 100 }}
          >
          Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              minWidth: 140,
              backgroundColor: 'rgb(34, 164, 34)',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgb(28, 140, 28)'
              }
            }}
          >
          Pay ${newTotal.toFixed(2)}
          </Button>
        </Box>
      </Box>
    </>
  );
};

PaymentSummary.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PaymentSummary;

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Paper, Stack, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { clearTransaction, closePaymentModal } from '../../redux/transaction/transactionSlice';

const PaymentResult = ({ onResetStep }) => {
  const dispatch = useDispatch();
  const { currentTransaction } = useSelector(state => state.transactions);

  // Simulate transaction status (replace with real status if available)
  const isSuccess = currentTransaction?.payment?.status === 'succeeded';

  // Example delivery info (replace with real data if available)
  const deliveryAddress = currentTransaction?.shipping?.address || 'No delivery address provided';
  const transactionId = currentTransaction?.payment?.id || 'N/A';
  const amount = currentTransaction?.amount || 0;
  const createdAt = currentTransaction?.createdAt
    ? new Date(currentTransaction.createdAt).toLocaleString()
    : 'N/A';

  const handleClose = () => {
    dispatch(clearTransaction());
    dispatch(closePaymentModal());
    onResetStep();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, sm: 4 },
        maxWidth: 420,
        mx: 'auto',
        background: '#fff',
        color: '#222',
        borderRadius: 3,
        textAlign: 'center',
      }}
    >
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: isSuccess ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          {isSuccess ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 64, color: 'success.main' }} />
          ) : (
            <HighlightOffIcon sx={{ fontSize: 64, color: 'error.main' }} />
          )}
        </Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          color={isSuccess ? 'success.main' : 'error.main'}
        >
          {isSuccess ? 'Payment Successful' : 'Payment Failed'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          {isSuccess
            ? 'Your transaction was completed successfully.'
            : 'There was a problem processing your payment.'}
        </Typography>
      </Box>

      <Stack spacing={1} sx={{ mb: 3, textAlign: 'left' }}>
        <Typography variant="subtitle2" color="text.secondary">
          Delivery Address:
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
          {deliveryAddress}
        </Typography>
        <Divider />
        <Typography variant="subtitle2" color="text.secondary">
          Transaction Details:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Transaction ID: <b>{transactionId}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Amount Paid: <b>${amount.toFixed(2)}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: <b>{createdAt}</b>
        </Typography>
      </Stack>

      <Button
        variant="contained"
        color={isSuccess ? 'success' : 'error'}
        onClick={handleClose}
        sx={{
          fontWeight: 'bold',
          minWidth: 140,
          mt: 2,
        }}
      >
        Close
      </Button>
    </Paper>
  );
};

PaymentResult.propTypes = {
  onResetStep: PropTypes.func.isRequired,
};

export default PaymentResult;

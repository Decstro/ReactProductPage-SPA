import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Snackbar,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateTransaction, completeTransaction } from '../../redux/transaction/transactionSlice';

const ConfirmPaymentBackdrop = ({
  open,
  onClose,
  onSubmit,
  amount
}) => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Mock API call - replace with your actual payment API
      const response = await mockPaymentApiCall(amount);

      dispatch(updateTransaction({
        status: 'completed',
        payment: {
          id: response.transactionId,
          amount: amount,
          status: response.status,
          timestamp: new Date().toISOString()
        }
      }));

      // Mark transaction as complete
      dispatch(completeTransaction());

      // Close modal and proceed
      onSubmit();
      onClose();
    } catch (err) {
      setError('Payment processing failed');
      setSnackbarOpen(true);
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock API function - replace with your actual API call
  const mockPaymentApiCall = (amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 10% chance of API failure
        if (Math.random() < 0.1) {
          reject(new Error('Payment service unavailable. Please try again later.'));
          return;
        }

        // Simulate backend response
        const success = Math.random() > 0.2; // 80% success rate

        if (success) {
          resolve({
            status: 'succeeded',
            transactionId: `txn_${Math.random().toString(36).substring(2, 9)}`,
            amount,
            message: 'Payment was successful',
          });
        } else {
          resolve({
            status: 'declined',
            transactionId: `txn_${Math.random().toString(36).substring(2, 9)}`,
            amount,
            declineReason: ['Insufficient funds', 'Invalid CVV'][Math.floor(Math.random() * 3)],
            message: 'Payment was declined by issuer'
          });
        }
      }, 1500);
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={isProcessing ? null : onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography
          fontWeight="bold"
          sx={{ display: 'flex', alignItems: 'center', fontSize: '25px' }}
        >
          Confirm Payment
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>

        <Typography
          variant="body3"
          sx={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}
        >
          You are about to complete your payment of:
        </Typography>
        <Typography
          fontWeight="bold"
          sx={{
            color: 'rgb(40, 201, 40)',
            fontSize: '22px',
            marginBottom: '10px'
          }}
        >
          ${amount.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize={18}>
          This action cannot be undone. Please confirm to proceed with the transaction.
        </Typography>

        {isProcessing && (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress
              size={20}
              thickness={4}
              sx={{ color: 'rgb(46, 216, 46)' }}
            />
            Processing...
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={isProcessing}
          variant="outlined"
          sx={{
            borderRadius: 4,
            py: 1.5,
            minWidth: 120
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isProcessing}
          variant="contained"
          color="success"
          sx={{
            borderRadius: 4,
            py: 1.5,
            minWidth: 120,
            backgroundColor: 'rgb(34, 164, 34)',
            '&:hover': { backgroundColor: 'rgb(28, 140, 28)' },
            '&:disabled': { backgroundColor: 'rgba(34, 164, 34, 0.5)' }
          }}
        >
          {isProcessing ? 'Processing...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmPaymentBackdrop.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
};

export default ConfirmPaymentBackdrop;

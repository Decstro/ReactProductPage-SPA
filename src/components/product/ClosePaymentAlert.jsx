import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { clearTransaction, resetPaymentStep } from '../../redux/transaction/transactionSlice';

const ClosePaymentAlert = ({
  open,
  onClose,
  onConfirm
}) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(clearTransaction());
    dispatch(resetPaymentStep());
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cancel Payment?</DialogTitle>
      <DialogContent>
        <Typography>Your payment progress will be lost.</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: 4,
            py: 1.5,
            backgroundColor: 'rgb(16, 124, 16)',
            '&:hover': { backgroundColor: 'rgb(13, 100, 13)' }
          }}
        >
          Continue Payment
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            borderRadius: 4,
            py: 1.5,
            backgroundColor: 'rgb(124, 16, 16)',
            '&:hover': { backgroundColor: 'rgb(100, 13, 13)' }
          }}
        >
          Cancel Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ClosePaymentAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ClosePaymentAlert;

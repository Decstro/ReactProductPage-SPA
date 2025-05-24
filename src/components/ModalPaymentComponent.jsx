import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ModalPaymentComponent = ({ open, onClose }) => {
  const { currentTransaction } = useSelector(state => state.transactions);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)', // For Safari support
      }}
    >
      <Box
        sx={{
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
          outline: 'none', // Remove default focus outline
          maxWidth: '90%', // Responsive width
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Payment Details
          </Typography>
          <IconButton onClick={onClose} edge="end" aria-label="close" size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box mb={3}>
          <Typography variant="body1" mb={1}>
            Total Amount
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="primary">
            ${currentTransaction?.amount || '0.00'}
          </Typography>
        </Box>

        <Typography variant="body1" align="center" py={4}>
          Payment Form
          {/* <PaymentForm onClose={onClose} /> */}
        </Typography>
      </Box>
    </Modal>
  );
};

ModalPaymentComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalPaymentComponent;

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import {
  Backdrop,
  Box,
  Slide,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const BackdropPaymentComponent = ({ open, onClose }) => {
  const theme = useTheme();
  const { currentTransaction } = useSelector(state => state.transactions);

  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: theme.zIndex.modal,
        alignItems: 'flex-end',
        backdropFilter: 'blur(4px)'
      }}
      onClick={(e) => {
        // Only close if clicking the backdrop itself, not the content
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Slide direction="up" in={open}>
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 3,
            boxShadow: 24,
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Payment Details
            </Typography>
            <IconButton onClick={onClose} edge="end" aria-label="close">
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
      </Slide>
    </Backdrop>
  );
};

BackdropPaymentComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BackdropPaymentComponent;

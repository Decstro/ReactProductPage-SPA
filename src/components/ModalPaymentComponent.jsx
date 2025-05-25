import React from 'react';

import PropTypes from 'prop-types';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PaymentForm from './PaymentForm.jsx';


const ModalPaymentComponent = ({ open, onClose }) => {

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
          width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
          outline: 'none', // Remove default focus outline
          maxWidth: '90%', // Responsive width
        }}
      >
        {/* Header with Xbox branding */}
        <Box
          display="flex"
          flexDirection="column"
          mb={2} // Reduced bottom margin
          sx={{
            position: 'relative',
          }}
        >
          {/* Header row with logo, title, and close button */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1} // Reduced space between header row and subtitle
            sx={{
              position: 'relative',
              width: '100%',
            }}
          >
            {/* Xbox Icon (left) */}
            <Box
              component="img"
              src="/src/assets/productImages/xboxLogoVerde.png"
              alt="Xbox"
              sx={{
                width: 40,
                height: 40,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}
            />

            {/* Title (center) */}
            <Typography
              variant="h4"
              fontWeight="bold"
              color="rgb(21, 158, 21)"
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              Payment Details
            </Typography>

            {/* Close button (right) */}
            <IconButton
              onClick={onClose}
              edge="end"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box mb={3}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'left', marginBottom: 1, fontSize: '17px' }}
            >
              You&#39;re almost there. Fill in your payment information
              below to securely complete your order.
            </Typography>

            <Box mt={2} display="flex" flexDirection="column" alignItems="flex-start">
              <PaymentForm />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

ModalPaymentComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalPaymentComponent;

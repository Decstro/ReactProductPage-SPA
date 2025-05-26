import React from 'react';
import PropTypes from 'prop-types';

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
import PaymentForm from './PaymentForm.jsx';

const BackdropPaymentComponent = ({ open, onClose }) => {
  const theme = useTheme();

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
      </Slide>
    </Backdrop>
  );
};

BackdropPaymentComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BackdropPaymentComponent;

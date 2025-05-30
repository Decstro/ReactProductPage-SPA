import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import {
  Backdrop,
  Box,
  Slide,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
} from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';
import PaymentStepper from './PaymentStepper.jsx';

const BackdropPaymentComponent = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: theme.zIndex.modal,
        alignItems: 'flex-end',
        backdropFilter: 'blur(4px)',
        bottom: 0,
        left: 0,
        right: 0,
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Slide
        direction="up"
        in={open}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%'
        }}
      >
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: '90vh',
            p: 3,
            boxShadow: 24,
            maxWidth: '600px',
            margin: '0 auto',
            ...(isMobile && {
              height: '85vh',
              borderRadius: 0,
              maxWidth: '100%'
            }),
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

          {/* Scrollable Content Area */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              pt: 2,
              pb: 4, // Add bottom padding for scroll space
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: 'left',
                mb: 3,
                fontSize: '17px',
                px: 1 // Add side padding
              }}
            >
              You&#39;re almost there. Fill in your payment information
              below to securely complete your order.
            </Typography>

            <Box mt={2} display="flex" flexDirection="column" alignItems="center">
              <PaymentStepper />
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

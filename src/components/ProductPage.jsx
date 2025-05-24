import React from 'react';

// MUI components
import {
  Grid,
  Card,
  Typography,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// Components
import ImageCarousel from './ImageCarousel';


function ProductPage() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container
      maxWidth="xl"
      sx={{ paddingTop: isMobile ? 2 : 4, paddingBottom: 4, paddingLeft: 0, paddingRight: 0 }}
    >
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Title */}
        <Box textAlign="left">
          <Typography
            variant="h5"
            fontWeight="bold"
            fontSize={20}
            style={{
              marginLeft: 15,
              cursor: 'pointer',
              display: 'inline-block',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}
            sx={{
              '&:hover': {
                color: '#ffffff', // White color
                textShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateY(-2px) scale(1.02)'
              }
            }}
          >
              Xbox Series X/S
          </Typography>
        </Box>


        {/* Carousel */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'transparent',
            p: 1 // Adds breathing room
          }}
        >
          <ImageCarousel />
        </Box>

        {/* Info + Card */}
        <Box bgcolor="#ddd" height={270}>[Extra Card]</Box>
      </Box>
    </Container>
  );
}

export default ProductPage;

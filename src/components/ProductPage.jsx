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
    <Container maxWidth="xl" sx={{ paddingTop: isMobile ? 2 : 4, paddingBottom: 4, paddingLeft: 0, paddingRight: 0 }}>
      {isMobile && (
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Title */}
          <Box textAlign="left">
            <Typography variant="h5" fontWeight="bold">
              Xbox Series X/S
            </Typography>
          </Box>

          {/* Carousel */}
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 400,
              bgcolor: 'transparent',
              p: 3 // Adds breathing room
            }}
          >
            <Card 
              sx={{
                width: '100%',
                maxWidth: 500, // Optimal carousel width
                bgcolor: 'grey.100', // Soft gray background
                borderRadius: 4, // Rounded corners
                boxShadow: '0 8px 16px rgba(0,0,0,0.12)', // Subtle depth
                overflow: 'hidden', // Keeps rounded corners on images
                border: '1px solid',
                borderColor: 'grey.300', // Light border
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }
              }}
            >
              {/* Floating Xbox-inspired badge */}
              <Box sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                bgcolor: '#107C10',
                color: 'white',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: 12,
                fontWeight: 'bold',
                zIndex: 2
              }}>
                XBOX
              </Box>
              
              <ImageCarousel />

              {/* Optional footer */}
              <Box sx={{
                bgcolor: 'grey.200',
                p: 2,
                textAlign: 'center',
                borderTop: '1px solid',
                borderColor: 'grey.300'
              }}>
                <Typography variant="caption" color="grey.600">
                  Scroll or click dots to navigate
                </Typography>
              </Box>
            </Card>
          </Box>

          {/* Info + Card */}
          <Box bgcolor="#ddd" height={270}>[Extra Card]</Box>
        </Box>
      )}

      {isTablet && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Tablet Layout</Typography>
          </Grid>
          {/* Tablet-specific components */}
        </Grid>
      )}

      {isDesktop && (
        <Grid container spacing={4}>
          <Grid item md={8}>
            <Typography variant="h4" gutterBottom>Desktop Layout</Typography>
            {/* Main content */}
          </Grid>
          <Grid item md={4}>
            {/* Sidebar or additional content */}
            Abduls
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ProductPage;

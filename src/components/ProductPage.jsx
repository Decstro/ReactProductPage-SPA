import { useState } from 'react';

// MUI components
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Rating,
  Avatar,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// MUI icons
import { Add, Remove } from '@mui/icons-material';

// Components
import Slider from 'react-slick';

// Images
const images = [
  'https://source.unsplash.com/random/800x600?product-1',
  'https://source.unsplash.com/random/800x600?product-2',
  'https://source.unsplash.com/random/800x600?product-3',
  'https://source.unsplash.com/random/800x600?product-4',
  'https://source.unsplash.com/random/800x600?product-5',
];

// Colors
const colors = ['#222', '#c00', '#0a0', '#09c'];

function ProductPage() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {isMobile && (
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Title */}
          <Box textAlign="center">
            <Typography variant="h5">Product Title</Typography>
            <Typography variant="subtitle2">Subtitle goes here</Typography>
          </Box>

          {/* Carousel */}
          <Box bgcolor="#eee" height={250}>[Carousel Here]</Box>

          {/* Info + Card */}
          <Box bgcolor="#ddd" p={2}>[Extra Card]</Box>
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
  // const [selectedColor, setSelectedColor] = useState(colors[0]);
  // const [quantity, setQuantity] = useState(1);

  // const price = 49.99;
  // const total = (price * quantity).toFixed(2);

  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  // };

  // return (
  //   <Box sx={{ flexGrow: 1, mt: 2 }}>
  //     <Grid container justifyContent="center">
  //       {/* Title and Subtitle */}
  //       <Grid item xs={12}>
  //         <Typography variant="h4" fontWeight="bold">Product Name</Typography>
  //         <Typography variant="subtitle1" color="primary">New Arrival</Typography>
  //       </Grid>

  //       {/* Main Card with Carousel */}
  //       <Grid item xs={12} md={6}>
  //         <Card>
  //           <Slider {...sliderSettings}>
  //             {images.map((img, idx) => (
  //               <Box
  //                 key={idx}
  //                 sx={{
  //                   height: 320,
  //                   display: 'flex',
  //                   alignItems: 'center',
  //                   justifyContent: 'center',
  //                   bgcolor: '#fafafa',
  //                 }}
  //               >
  //                 <img
  //                   src={img}
  //                   alt={`Product ${idx + 1}`}
  //                   style={{ maxHeight: 300, maxWidth: '100%', borderRadius: 8 }}
  //                 />
  //               </Box>
  //             ))}
  //           </Slider>
  //         </Card>
  //       </Grid>

  //       {/* Product Info */}
  //       <Grid item xs={12} md={6}>
  //         <Card>
  //           <CardContent>
  //             {/* Product Name */}
  //             <Typography variant="h5" fontWeight="bold" gutterBottom>
  //               Product Name
  //             </Typography>
  //             {/* Rating and Reviews */}
  //             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
  //               <Rating value={4} readOnly precision={0.5} />
  //               <Typography variant="body2" sx={{ ml: 1 }}>
  //                 4.0 | 123 reviews
  //               </Typography>
  //             </Box>
  //             {/* Catchy Text */}
  //             <Typography variant="body1" color="text.secondary" gutterBottom>
  //               This is a catchy description that highlights the best features
  //               of the product. Don't miss out!
  //             </Typography>
  //             {/* Colors and Quantity */}
  //             <Grid container alignItems="center" spacing={2} sx={{ my: 2 }}>
  //               <Grid item>
  //                 <Typography variant="subtitle2">Colors:</Typography>
  //               </Grid>
  //               <Grid item>
  //                 <Box sx={{ display: 'flex', gap: 1 }}>
  //                   {colors.map((color) => (
  //                     <Avatar
  //                       key={color}
  //                       sx={{
  //                         bgcolor: color,
  //                         border: selectedColor === color ? '2px solid #1976d2' : '2px solid #fff',
  //                         cursor: 'pointer',
  //                         width: 32,
  //                         height: 32,
  //                         transition: 'border 0.2s',
  //                       }}
  //                       onClick={() => setSelectedColor(color)}
  //                     />
  //                   ))}
  //                 </Box>
  //               </Grid>
  //               <Grid item xs />
  //               <Grid item>
  //                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //                   <IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))}>
  //                     <Remove />
  //                   </IconButton>
  //                   <Typography variant="body1" sx={{ mx: 1 }}>{quantity}</Typography>
  //                   <IconButton onClick={() => setQuantity(q => q + 1)}>
  //                     <Add />
  //                   </IconButton>
  //                 </Box>
  //               </Grid>
  //             </Grid>
  //             {/* Payable Amount and Buy Button */}
  //             <Grid container alignItems="center" sx={{ mt: 2 }}>
  //               <Grid item xs={6}>
  //                 <Typography variant="subtitle1" fontWeight="bold">
  //                   Payable Amount: ${total}
  //                 </Typography>
  //               </Grid>
  //               <Grid item xs={6} sx={{ textAlign: 'right' }}>
  //                 <Button variant="contained" color="primary" size="large">
  //                   Buy Now
  //                 </Button>
  //               </Grid>
  //             </Grid>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //     </Grid>
  //   </Box>
  // );
}

export default ProductPage;

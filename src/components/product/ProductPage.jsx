import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setSelectedProduct, updateProductImages, fetchProducts,
} from '../../redux/product/productSlice';
import {
  startTransaction, openPaymentModal, closePaymentModal,
} from '../../redux/transaction/transactionSlice';

// MUI components
import {
  Typography,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
  Rating,
  Badge,
  Tooltip,
} from '@mui/material';


import {
  Add, Remove, ShoppingCart as CartIcon, Inventory as InventoryIcon,
} from '@mui/icons-material';

// Components
import ImageCarousel from './ImageCarousel';

// Images
import frontXboxSeriesX from '../../assets/productImages/frontXbox.png';
import backXboxSeriesX from '../../assets/productImages/backXbox.png';
import fullXboxSeriesX from '../../assets/productImages/fullXbox.png';
import xboxBlackBoxSeriesX from '../../assets/productImages/xboxBlackBox.png';
import frontXboxSeriesS from '../../assets/productImages/frontXboxS.png';
import backXboxSeriesS from '../../assets/productImages/backXboxS.png';
import fullXboxSeriesS from '../../assets/productImages/fullXboxS.png';
import xboxBlackBoxSeriesS from '../../assets/productImages/xboxBlackBoxS.png';

import AdaptivePayment from '../payment/AdaptivePayment';
import ClosePaymentAlert from './ClosePaymentAlert';

const xboxSeriesXImages = [
  { imgPath: frontXboxSeriesX, alt: 'XboxFront' },
  { imgPath: fullXboxSeriesX, alt: 'XboxPart' },
  { imgPath: backXboxSeriesX, alt: 'XboxBack' },
  { imgPath: xboxBlackBoxSeriesX, alt: 'XboxBlackBox' },
];

const xboxSeriesSImages = [
  { imgPath: frontXboxSeriesS, alt: 'XboxFront' },
  { imgPath: fullXboxSeriesS, alt: 'XboxPart' },
  { imgPath: backXboxSeriesS, alt: 'XboxBack' },
  { imgPath: xboxBlackBoxSeriesS, alt: 'XboxBlackBox' },
];


function ProductPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isPaymentOpen = useSelector(state => state.transactions.isPaymentOpen);
  const { items: products } = useSelector(state => state.products);
  const { currentTransaction } = useSelector(state => state.transactions);

  // Local component state
  const [showCloseAlert, setShowCloseAlert] = useState(false);
  // Initialize local state from persisted transaction
  const [quantity, setQuantity] = useState(
    currentTransaction?.quantity || 1
  );
  const [selectedConsole, setSelectedConsole] = useState(
    currentTransaction?.productId?.split('-')[2]?.toUpperCase() || 'X'
  );


  const selectedImages = selectedConsole === 'X' ? xboxSeriesXImages : xboxSeriesSImages;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Calculate price based on selected console
  const unitPrice = selectedConsole === 'X' ? 399.99 : 299.99;
  const totalAmount = parseFloat((quantity * unitPrice).toFixed(2));

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));

  // Get current product stock
  const currentProductStock = products.find(
    p => p.id === `xbox-series-${selectedConsole.toLowerCase()}`
  )?.stock || 0;

  // 1. First fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 2. Then update images after products are loaded
  useEffect(() => {
    dispatch(updateProductImages({
      productId: 'xbox-series-x',
      images: xboxSeriesXImages
    }));
    dispatch(updateProductImages({
      productId: 'xbox-series-s',
      images: xboxSeriesSImages
    }));
  }, [products, dispatch]);

  useEffect(() => {
    // Only reopen modal if transaction was incomplete
    if (currentTransaction && currentTransaction.status === 'pending') {
      dispatch(openPaymentModal());
      setSelectedConsole(currentTransaction.productId.split('-')[2].toUpperCase());
      setQuantity(currentTransaction.quantity);
    }
  }, [currentTransaction, dispatch]);

  const handleSeriesSClick = () => {
    const newConsole = selectedConsole === 'X' ? 'S' : 'X';
    setSelectedConsole(newConsole);
    setQuantity(1);

    // Optional: Sync with Redux
    const product = products.find(p => p.id === `xbox-series-${newConsole.toLowerCase()}`);
    if (product) {
      dispatch(setSelectedProduct(product));
    }
  };

  const handleCloseModal = () => {
    setShowCloseAlert(true);
  };

  const handleConfirmClose = () => {
    dispatch(closePaymentModal());
  };

  const handlePayment = (totalAmount) => {
    if (currentProductStock < quantity) {
      alert('Not enough stock available');
      return;
    }

    dispatch(startTransaction({
      productId: `xbox-series-${selectedConsole.toLowerCase()}`,
      quantity,
      amount: totalAmount,
      date: new Date().toISOString()
    }));
    dispatch(openPaymentModal());
  };


  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          px: isMobile ? 0 : 4,
        }}
      >
        {/* Title */}
        {
          !isDesktop && (
            <Box textAlign="left" ml={2}>
              <Box
                sx={{
                  display: 'inline-block',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                <Typography variant="h4" fontWeight="bold" color="#ffffff">
                  Xbox Series X/S
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ fontSize: 20 }}
                  color="#ffffff"
                >
                  Power your dreams
                </Typography>
              </Box>
            </Box>
          )
        }

        {/* Main Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            gap: isDesktop ? 6 : 3,
            alignItems: 'center'
          }}
        >
          {/* Xbox Text - Only shows on desktop */}
          {isDesktop && (
            <Box
              sx={{
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              {/* TITLE */}
              <Typography
                textAlign="left"
                variant="h1"
                sx={{
                  fontFamily: '"Segoe UI Black", "Arial Black", "Montserrat ExtraBold", sans-serif',
                  fontSize: '4.5rem',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  whiteSpace: 'pre-line', // supports multi-line if needed
                }}
              >
                XBOX{'\n'}SERIES X/S
              </Typography>

              {/* GREEN ACCENT BAR */}
              <Box
                sx={{
                  width: '60px',
                  height: '10px',
                  backgroundColor: 'rgb(40, 201, 40)', // approximate Xbox green
                  transform: 'skew(-30deg)',
                  mb: 1,
                }}
              />

              {/* SUBTITLE */}
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Segoe UI", sans-serif',
                  fontWeight: 600,
                  color: '#ffffff',
                  fontSize: 'Z.5rem',
                }}
              >
                Power your dreams
              </Typography>
            </Box>

          )}

          {/* Carousel */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'transparent',
              p: 1, // Adds breathing room
              width: isDesktop ? '60%' : '100%',
              minWidth: isDesktop ? 500 : 'auto'
            }}
          >
            <ImageCarousel selectedImages={selectedImages} />
          </Box>

        </Box>

        {/* Info Card */}
        <Box
          sx={{
            width: isDesktop ? '60%' : '90%',
            cursor: 'pointer',
            borderRadius: 2,
            p: 3,
            mt: 3,
            mx: 'auto',
            bgcolor: 'rgba(30, 30, 30, 0.85)', // Dark grey with opacity
            backdropFilter: 'blur(8px)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)', // Single strong shadow
            border: '2px solid rgba(220, 220, 220, 0.4)', // Light gray border
            position: 'relative',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)', // Stronger shadow on hover
              borderColor: 'rgba(220, 220, 220, 0.7)', // Brighter border on hover
              transform: 'translateY(-2px)'
            },
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
          }}>

          {/* Product Title */}
          <Box mb={2}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Box component="span" sx={{ color: '#fff', mr: 1 }}>
                  Xbox
              </Box>
              <Box component="span" sx={{ color: 'rgb(40, 201, 40)' }}>
                  Series X/S
              </Box>
              <Box sx={{ ml: 'auto' }}>
                <Tooltip
                  title={`${currentProductStock} Units remaining in stock`}
                  arrow
                  placement="top"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: 'rgb(50, 50, 50)',
                        color: '#fff',
                        fontSize: '0.875rem',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.5)',
                        '& .MuiTooltip-arrow': {
                          color: 'rgb(50, 50, 50)'
                        }
                      }
                    }
                  }}
                >
                  <IconButton
                    sx={{
                      backgroundColor: 'rgb(112, 116, 112, 0.3)',
                      border: '1px solid rgb(112, 116, 112)',
                      borderRadius: '4px',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'rgb(112, 116, 112, 0.5)'
                      }
                    }}
                  >
                    <Badge
                      badgeContent={currentProductStock}
                      color="success"
                      sx={{
                        '& .MuiBadge-badge': {
                          right: -5,
                          top: -5,
                          backgroundColor: 'rgb(40, 201, 40)',
                          color: '#fff'
                        }
                      }}
                    >
                      <InventoryIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
            </Typography>
          </Box>

          {/* Rating - Xbox Green Stars */}
          <Box display="flex" alignItems="center" mb={2}>
            <Rating
              value={4.5}
              precision={0.5}
              readOnly
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'rgb(40, 201, 40)', // Xbox green for filled stars
                },
                '& .MuiRating-iconHover': {
                  color: '#0e6b0e', // Darker green on hover
                },
                '& .MuiRating-iconEmpty': {
                  color: 'rgba(16, 124, 16, 0.3)', // Light green outline
                }
              }}
            />
            <Typography variant="body2" color="#fff" ml={1}>
                59 Ratings | (1,234 reviews)
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            fontSize={18}
            color="#fff"
            fontWeight="bold"
            mb={3}
            align="left" // Align text to the left
            sx={{
              textAlign: 'left', // Additional styling for left alignment
              textJustify: 'inter-word' // Improves text spacing when justified
            }}
          >
              Experience next-gen gaming with Xbox Series X/S. Enjoy up to 4K
              at 120 FPS or 1440p digital gaming, faster load times, and backward compatibility.
          </Typography>

          {/* Series Selection */}
          <Box mb={3}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={1}
              sx={{ color: 'rgb(40, 201, 40)', textAlign: 'left' }}
            >
                Version
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center">

              {/* Left side: Series selection */}
              <Box display="flex" alignItems="center" gap={2}>
                {/* Series X Option */}
                <Box
                  sx={{
                    width: 100,
                    height: 40,
                    borderRadius: '20px',
                    backgroundColor: selectedConsole === 'X' ? '#0e6b0e' : '#000',
                    border: '2px solid #333',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      borderColor: '#107C10'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#107C10',
                      opacity: 0,
                      transition: 'opacity 0.2s ease'
                    },
                    '&:hover::before': {
                      opacity: 1
                    }
                  }}
                  onClick={handleSeriesSClick}
                >
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="white"
                    sx={{ zIndex: 1 }}
                  >
                      Series X
                  </Typography>
                </Box>

                {/* Series S Option */}
                <Box
                  sx={{
                    width: 100,
                    height: 40,
                    borderRadius: '20px',
                    backgroundColor: selectedConsole === 'S' ? '#0e6b0e' : '#fff',
                    border: '2px solid #8f8d8d',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      borderColor: '#12b512'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#12b512',
                      opacity: 0,
                      transition: 'opacity 0.2s ease'
                    },
                    '&:hover::before': {
                      opacity: 1
                    }
                  }}
                  onClick={handleSeriesSClick}
                >
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={selectedConsole === 'S' ? '#fff' : '#000'}
                    sx={{ zIndex: 1 }}
                  >
                      Series S
                  </Typography>
                </Box>
              </Box>

              {/* Right side: Quantity Selector */}
              <Box
                display="flex"
                alignItems="center"
                border="1px solid rgb(81, 83, 81)" // Darker green border
                borderRadius="12px"
                px={1.5}
                py={0.5}
                sx={{
                  backgroundColor: 'rgb(112, 116, 112)', // 15% opacity of #0e6b0e
                  boxShadow: '0 0 8px rgb(214, 225, 214)2)', // Stronger shadow
                  width: 'fit-content' // Ensures compact sizing
                }}
              >
                <IconButton
                  size="small"
                  onClick={handleDecrease}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgb(112, 116, 112)', // Dark green
                    '&:hover': {
                      transform: 'scale(1.3)', // Slightly larger on hover
                      backgroundColor: 'rgb(112, 116, 112)',
                    },
                    width: 32, // Slightly larger buttons
                    height: 32,
                    borderRadius: '8px' // More rounded corners
                  }}
                >
                  <Remove fontSize="small" />
                </IconButton>

                <Typography
                  mx={3} // More horizontal spacing
                  fontWeight="bold"
                  fontSize={22} // Larger number
                  color="white"
                >
                  {quantity}
                </Typography>

                <IconButton
                  size="small"
                  onClick={handleIncrease}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgb(112, 116, 112)', // here
                    '&:hover': {
                      transform: 'scale(1.3)', // Slightly larger on hover
                      backgroundColor: 'rgb(112, 116, 112)', // here
                    },
                    width: 32,
                    height: 32,
                    borderRadius: '8px'
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Total Price and Buy Button */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
            >
              <Typography variant="h4" color="#fff" fontWeight="bold" mb={-0.5}>
                ${totalAmount}
              </Typography>
              <Typography variant="body1" color="#aaa">
                Total Payable Amount
              </Typography>
            </Box>

            {/* Buy Now Button */}
            <Box
              display="flex"
              alignItems="center"
              sx={{
                backgroundColor: 'rgb(34, 164, 34)', // 15% opacity of #0e6b0e
                boxShadow: '0 0 8px rgb(40, 201, 40)',
                borderRadius: '12px',
                width: '100%', // Take full width of the container
                maxWidth: '300px', // Set a maximum width
              }}
            >
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<CartIcon />}
                sx={{
                  py: 1,
                  px: 3,
                  backgroundColor: 'rgb(34, 164, 34)', // Dark green
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  minHeight: '50px', // Ensure consistent height
                }}
                onClick={() => handlePayment(totalAmount)}
              >
                Pay with credit card
              </Button>
            </Box>
          </Box>

        </Box>
      </Container>

      {/* Backdrop/Modal for product payment */}
      <AdaptivePayment
        isDesktop={isDesktop}
        open={isPaymentOpen}
        onClose={handleCloseModal}
      />

      {/* Alert component */}
      <ClosePaymentAlert
        open={showCloseAlert}
        onClose={() => setShowCloseAlert(false)}
        onConfirm={handleConfirmClose}
      />
    </>
  );
}

export default ProductPage;

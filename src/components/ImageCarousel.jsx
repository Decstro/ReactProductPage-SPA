
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';


// MUI components
import { useTheme } from '@mui/material/styles';
import {
  CardActionArea,
  CardMedia,
  Box,
  IconButton,
  useMediaQuery,
} from '@mui/material';

// MUI icons
import {
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';

import Slider from 'react-slick';
import { getCarouselDotGap, getCarouselDotWidth } from './helpers';

function ImageCarousel({ selectedImages }) {
  const theme = useTheme();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);


  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const goToSlide = (index) => {
    setCurrentSlide(index);
    sliderRef.current.slickGoTo(index); // This actually moves the slider
  };

  const settings = {
    dots: false, // We'll implement custom dots
    infinite: true,
    speed: 50,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Use fade transition instead of sliding
    cssEase: 'ease-out',
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 600, // mobile
        settings: {
          arrows: false // hide arrows on mobile if needed
        }
      }
    ]
  };

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      background: 'transparent',
    }}>

      {/* Image Container */}
      <Box sx={{
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'none', // No shadow
        border: 'none', // No border
        aspectRatio: '16/9', // Maintain aspect ratio
        width: '100%',
        background: 'transparent', // Truly transparent
        transition: 'none'
      }}>
        {/* Custom Previous Arrow */}
        <IconButton
          sx={{
            position: 'absolute',
            left: isDesktop ? 80 : 60, // Position at the edge of the image
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'black', // Black icon for contrast
            backgroundColor: 'rgba(237, 241, 234, 0.8)', // #7fe62a with 80% opacity
            width: isMobile ? 32 : 40,
            height: isMobile ? 32 : 40,
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.2)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: 'rgb(40, 215, 40)', // Solid green on hover
              boxShadow: '0 0 0 4px rgba(127, 230, 42, 0.3)', // Glow effect
              transform: 'translateY(-50%) scale(1.1)'
            },
            '& .MuiSvgIcon-root': {
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))' // Icon shadow
            }
          }}
          onClick={() => sliderRef.current.slickPrev()}
        >
          <NavigateBefore />
        </IconButton>

        {/* Slider */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}>
          <Slider ref={sliderRef} {...settings}>
            {selectedImages.map((image, index) => (
              <div key={index}>
                <CardActionArea
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent'
                    },
                    '&:focus': {
                      outline: 'none'
                    },
                    '& .MuiCardActionArea-focusHighlight': {
                      display: 'none'
                    },
                    '& .MuiTouchRipple-root': {
                      display: 'none'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'scale-down',
                      aspectRatio: '16/9',
                      transition: 'none', // Disable any transitions
                      '&:hover': {
                        transform: 'none' // Disable any hover effects
                      }
                    }}
                    image={image.imgPath}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </CardActionArea>
              </div>
            ))}
          </Slider>
        </Box>

        {/* Custom Next Arrow */}
        <IconButton
          sx={{
            position: 'absolute',
            right: isDesktop ? 80 : 60,  // Position at the edge of the image
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'black', // Black icon for contrast
            backgroundColor: 'rgba(237, 241, 234, 0.8)', // #7fe62a with 80% opacity
            width: isMobile ? 32 : 40,
            height: isMobile ? 32 : 40,
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.2)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: 'rgb(40, 215, 40)', // Solid green on hover
              boxShadow: '0 0 0 4px rgba(127, 230, 42, 0.3)', // Glow effect
              transform: 'translateY(-50%) scale(1.1)'
            },
            '& .MuiSvgIcon-root': {
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))' // Icon shadow
            }
          }}
          onClick={() => sliderRef.current.slickNext()}
        >
          <NavigateNext />
        </IconButton>

      </Box>


      {/* Custom Dots Indicator */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: isMobile ? 2 : 3,
        mb: isMobile ? 1 : 2,
        gap: getCarouselDotGap(isMobile, isTablet),
        height: isMobile ? 12 : 16
      }}>
        {selectedImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: getCarouselDotWidth(isMobile, isTablet, index === currentSlide),
              height: isMobile ? 4 : 6,
              borderRadius: '10px',
              bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.7)',
                transform: index === currentSlide ? 'scaleX(1.05)' : 'scaleX(1.3)'
              },
              ...(index === currentSlide && {
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.7)'
              })
            }}
          />
        ))}
      </Box>

    </Box>
  );
}

ImageCarousel.propTypes = {
  selectedImages: PropTypes.object.isRequired,
};

export default ImageCarousel;

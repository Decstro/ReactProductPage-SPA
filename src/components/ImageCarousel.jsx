import React, { useState, useRef } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import frontXbox from '../assets/productImages/frontXbox.png';
import backXbox from '../assets/productImages/backXbox.png';
import fullXbox from '../assets/productImages/fullXbox.png';
import xboxBlackBox from '../assets/productImages/xboxBlackBox.png';

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

const images = [
  { imgPath: frontXbox, alt: 'XboxFront' },
  { imgPath: fullXbox, alt: 'XboxPart' },
  { imgPath: backXbox, alt: 'XboxBack' },
  { imgPath: xboxBlackBox, alt: 'XboxBlackBox' },
];

export default function ImageCarousel() {
  const theme = useTheme();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const goToSlide = (index) => {
    setCurrentSlide(index);
    sliderRef.current.slickGoTo(index); // This actually moves the slider
  };

  const settings = {
    dots: false, // We'll implement custom dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Use fade transition instead of sliding
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
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
      }}>
        {/* Custom Previous Arrow */}
        <IconButton
          sx={{
            position: 'absolute',
            left: isMobile ? 4 : 10,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: isMobile ? 32 : 40,
            height: isMobile ? 32 : 40,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.7)'
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
            {images.map((image, index) => (
              <div key={index}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'scale-down',
                      aspectRatio: '16/9'
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
            right: isMobile ? 4 : 10,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: isMobile ? 32 : 40,
            height: isMobile ? 32 : 40,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.7)'
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
        {images.map((_, index) => (
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

import { useState, useRef } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import xbox1 from '../assets/productImages/xbox1.jpeg';
import xbox2 from '../assets/productImages/xbox2.jpeg';
import xbox3 from '../assets/productImages/xbox3.jpeg';

// MUI components
import {
  Card,
  CardActionArea,
  CardMedia,
  Box,
  IconButton,
} from '@mui/material';

// MUI icons
import {
  FiberManualRecord,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';

import Slider from 'react-slick';

const images = [
  { imgPath: xbox1, alt: 'XboxFront' },
  { imgPath: xbox2, alt: 'XboxBack' },
  { imgPath: xbox3, alt: 'XboxPart' },
];

export default function ImageCarousel() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <Card sx={{
      bgcolor: 'transparent',
      boxShadow: 'none',
      position: 'relative',
      height: '100%', // Take full height from parent
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Card sx={{
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Custom Previous Arrow */}
        <IconButton
          sx={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.7)'
            }
          }}
          onClick={() => sliderRef.current.slickPrev()}
        >
          <NavigateBefore />
        </IconButton>

        <Slider ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="280"
                  image={image.imgPath}
                  alt={image.alt}
                  sx={{ objectFit: 'cover' }}
                />
              </CardActionArea>
            </div>
          ))}
        </Slider>

        {/* Custom Next Arrow */}
        <IconButton
          sx={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.7)'
            }
          }}
          onClick={() => sliderRef.current.slickNext()}
        >
          <NavigateNext />
        </IconButton>
      </Card>

      {/* Custom Dots Indicator */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Perfect vertical alignment
        mt: 3,
        gap: 2,
        height: 16 // Fixed container height
      }}>
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: index === currentSlide ? 32 : 16, // More dramatic size difference
              height: 8,
              borderRadius: '20px', // Super oval shape
              bgcolor: index === currentSlide ? '#107C10' : 'grey.500',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', // Bouncy animation
              cursor: 'pointer',
              '&:hover': {
                bgcolor: index === currentSlide ? '#0e6b0e' : 'grey.600',
                transform: index === currentSlide ? 'scaleX(1.05)' : 'scaleX(1.2)'
              },
              // Xbox LED glow effect for active dot
              ...(index === currentSlide && {
                boxShadow: '0 0 8px rgba(16, 124, 16, 0.7)'
              })
            }}
          />
        ))}
      </Box>
    </Card>
  );
}

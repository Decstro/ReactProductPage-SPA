import {
  AppBar, Toolbar, Box, IconButton, useMediaQuery, useTheme, Typography,
} from '@mui/material';

import  { getHeigth, getMinnHeight, getLogoHeigth } from './helpers';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import xboxLogo from '../assets/productImages/xboxLogoBlanco.png';
import microsoftLogo from '../assets/productImages/microsoftLogo.png';

function Header() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <AppBar
      position="fixed"
      sx={{
        background: isDesktop
          ? 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)'
          : '#000',
        height: getHeigth(isMobile, isTablet),
        minHeight: getMinnHeight(isMobile, isTablet),
        transition: 'all 0.3s ease',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(16, 124, 16, 0.5)',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #107C10, transparent)',
          boxShadow: '0 0 8px rgba(16, 124, 16, 0.7)',
          zIndex: 1
        }
      }}
      component="header"
    >
      <Toolbar variant="dense" sx={{ height: '100%', px: isMobile ? 1 : 3 }}>
        {/* Menu Button (Always visible) */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            mr: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiSvgIcon-root': {
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8)) brightness(1.2)',
                transform: 'scale(1.1)'
              }
            }
          }}
        >
          <MenuIcon
            fontSize={isDesktop ? "medium" : "small"}
            sx={{
              transition: 'all 0.3s ease',
            }}
          />
        </IconButton>

        {/* Microsoft Logo (Tablet+) */}
        {!isMobile && (
          <Box
            component="img"
            src={microsoftLogo}
            alt="Microsoft"
            sx={{
              height: isTablet ? 90 : 120,
              mr: isDesktop ? 4 : 2,
              opacity: 0.9
            }}
          />
        )}

        {/* Navigation Links (Desktop only) */}
        {isDesktop && (
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Games', 'Game Pass', 'Devices', 'Community'].map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '4px 8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#107C10',
                    textShadow: '0 0 8px rgba(16, 124, 16, 0.5)',
                    boxShadow: '0 0 12px rgba(16, 124, 16, 0.3)',
                    transform: 'translateY(-2px)',
                    backgroundColor: 'rgba(16, 124, 16, 0.05)',
                    borderRadius: '4px'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 0,
                    height: '2px',
                    backgroundColor: '#107C10',
                    transition: 'all 0.3s ease',
                    transform: 'translateX(-50%)'
                  },
                  '&:hover::after': {
                    width: '80%'
                  }
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        )}

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Search Icon (Tablet+) */}
        {!isMobile && (
          <IconButton
            color="inherit"
            sx={{
              mr: isDesktop ? 2 : 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiSvgIcon-root': {
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8)) brightness(1.2)',
                  transform: 'scale(1.1)'
                }
              }
            }}
          >
            <SearchIcon
              fontSize={isTablet ? "small" : "medium"}
              sx={{
                transition: 'all 0.3s ease',
              }}
            />
          </IconButton>
        )}

        {/* Xbox Logo */}
        <Box
          component="img"
          src={xboxLogo}
          alt="Xbox"
          sx={{
            height: getLogoHeigth(isMobile, isTablet),
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.8)) brightness(1.2)',
              transform: 'scale(1.05)'
            }
          }}
        />

      </Toolbar>
    </AppBar>
  );
}

export default Header;

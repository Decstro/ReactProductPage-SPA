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
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon fontSize={isDesktop ? "medium" : "small"} />
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
                  '&:hover': {
                    color: '#107C10'
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
          <IconButton color="inherit" sx={{ mr: isDesktop ? 2 : 1 }}>
            <SearchIcon fontSize={isTablet ? "small" : "medium"} />
          </IconButton>
        )}

        {/* Xbox Logo */}
        <Box
          component="img"
          src={xboxLogo}
          alt="Xbox"
          sx={{
            height: getLogoHeigth(isMobile, isTablet),
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))'
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;

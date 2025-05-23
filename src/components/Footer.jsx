import { AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material';

function Footer() {
  const isSmallScreen = useMediaQuery('(max-width:750px)');

  return (
    <AppBar
      position="fixed"
      component="footer"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: '#1a1a1a',
        height: '5vh',
        minHeight: 48,
        boxShadow: 'none',
        justifyContent: 'center',
        padding: '0',
      }}
    >
      <Toolbar
        disableGutters
        variant="dense"
        sx={{
          width: '100%',
          minHeight: '0 !important',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0',
        }}
      >
        <Typography
          variant="h6"
          color="white"
          align="center"
          sx={{ width: '100%', fontSize: '1.2rem' }}
        >
          © {new Date().getFullYear()} All rights reserved ©
          {!isSmallScreen && (
            <>
              {' '}| Powered by Decstro | Privacy Policy
            </>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;

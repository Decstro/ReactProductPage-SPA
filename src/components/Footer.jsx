import { Box, Typography, useMediaQuery } from '@mui/material';

function Footer() {
  const isSmallScreen = useMediaQuery('(max-width:750px)');

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '5vh',
        backgroundColor: '#1a1a1a',
        p: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        color="white"
        align="center"
        sx={{ width: '100%', fontSize: '1.2rem' }}
      >
        © {new Date().getFullYear()} All rights reserved
        {!isSmallScreen && (
          <>
            {' '}| Powered by Decstro | Contact: support@decstro.com | Privacy Policy
          </>
        )}
      </Typography>
    </Box>
  );
}
export default Footer;

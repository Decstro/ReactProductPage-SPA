import { Box } from '@mui/material';
import { FaBars, FaUser } from 'react-icons/fa';

function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: 'grey.900',
        height: '64px',
        minHeight: '64px',
        p: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1100,
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', pl: 2 }}>
        <FaBars style={{ color: 'white', fontSize: 18 }} />
      </Box>
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', pr: 2 }}>
        <FaUser style={{ color: 'white', fontSize: 18 }} />
      </Box>
    </Box>
  );
}

export default Header;

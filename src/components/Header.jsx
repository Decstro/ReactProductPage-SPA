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
        backgroundColor: '#1a1a1a',
        height: '5vh',
        p: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1100,
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', pl: 2 }}>
        <FaBars
          className="header-icon"
          style={{ color: 'white', fontSize: 28, cursor: 'pointer' }}
        />
      </Box>
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', pr: 2 }}>
        <FaUser
          className="header-icon"
          style={{ color: 'white', fontSize: 28, cursor: 'pointer' }}
        />
      </Box>
    </Box>
  );
}

export default Header;

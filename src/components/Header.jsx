import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#1a1a1a',
        height: '5vh',
        minHeight: 48,
        justifyContent: 'center',
        boxShadow: 'none',
      }}
      component="header"
    >
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

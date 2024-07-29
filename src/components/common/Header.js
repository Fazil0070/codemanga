import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: 'none',
  width: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0',
});

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.common.white,
  textDecoration: 'none',
}));

const NavButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 5,
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const MobileMenu = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
    position: 'absolute',
    top: '56px',
    right: '0',
    background: theme.palette.primary.main,
    width: '100%',
    zIndex: 1,
  },
}));

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth={false} disableGutters>
        <StyledToolbar>
          <Logo component={Link} to="/">
            <SchoolIcon sx={{ fontSize: 32, marginRight: 1 }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
              LearnSpire
            </Typography>
          </Logo>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open menu"
                edge="end"
                onClick={handleMenuToggle}
              >
                <MenuIcon />
              </IconButton>
              {menuOpen && (
                <MobileMenu>
                  <StyledButton
                    color="inherit"
                    component={Link}
                    to="/admin/dashboard"
                    startIcon={<DashboardIcon />}
                    onClick={handleMenuToggle}
                  >
                    Admin
                  </StyledButton>
                  <StyledButton
                    color="inherit"
                    component={Link}
                    to="/student/dashboard"
                    startIcon={<DashboardIcon />}
                    onClick={handleMenuToggle}
                  >
                    Student
                  </StyledButton>
                  <StyledButton
                    color="inherit"
                    component={Link}
                    to="/login"
                    startIcon={<LoginIcon />}
                    onClick={handleMenuToggle}
                  >
                    Login
                  </StyledButton>
                  <StyledButton
                    color="inherit"
                    component={Link}
                    to="/register"
                    startIcon={<PersonAddIcon />}
                    onClick={handleMenuToggle}
                  >
                    Register
                  </StyledButton>
                </MobileMenu>
              )}
            </>
          ) : (
            <NavButtons>
              <StyledButton
                color="inherit"
                component={Link}
                to="/admin/dashboard"
                startIcon={<DashboardIcon />}
              >
                Admin
              </StyledButton>
              <StyledButton
                color="inherit"
                component={Link}
                to="/student/dashboard"
                startIcon={<DashboardIcon />}
              >
                Student
              </StyledButton>
              <StyledButton
                color="inherit"
                component={Link}
                to="/login"
                startIcon={<LoginIcon />}
              >
                Login
              </StyledButton>
              <StyledButton
                color="inherit"
                component={Link}
                to="/register"
                startIcon={<PersonAddIcon />}
              >
                Register
              </StyledButton>
            </NavButtons>
          )}
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;

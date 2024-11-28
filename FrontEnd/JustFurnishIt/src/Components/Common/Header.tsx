import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";
import { clearCredentials } from "../../Redux/Slicer/AuthSlice";
import toast from "react-hot-toast";
import logo from "../../assets/logoo.png";
import { useEffect, useState } from "react";

const designCategories = [
  "Modular Kitchen Designs",
  "Bathroom Designs",
  "Master Bedroom Designs",
  "Living Room Designs",
  "Balcony Designs",
  "Dining Room Designs",
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, userDetails } = useSelector((state: RootState) => state.auth);

useEffect(() => {
    setAnchorElUser(null);
  }, [token]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(clearCredentials());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleDesignIdeasClick = () => {
    navigate("/design-ideas");
  };

  const handleCategoryClick = (category: string) => {
    const slug = category
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    navigate(`/design-ideas/${slug}`);
    setIsDropdownOpen(false);
  };


  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#ffffff", color: "#333", zIndex: 1000 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo / Title on the left */}
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <Box
              component="img"
              src={logo}
              alt="Logo with Name"
              sx={{ maxHeight: "50px", mr: 0.5, mb: 2 }}
            />
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                fontFamily: "", // Update with preferred font
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: { xs: "18px", md: "24px" },
              }}
            >
              JustFurnishIt
            </Typography>
          </Box>

          {/* Centered Desktop Navigation Links */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Button
              component={NavLink}
              to="/"
              sx={{ color: "inherit", fontfamily: "sans-serif" }}
            >
              Home
            </Button>

            {/* Design Ideas Dropdown */}
            <Box
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              sx={{ position: "relative" }}
            >
              <Button
                onClick={handleDesignIdeasClick}
                sx={{ color: "inherit" }}
                endIcon={isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              >
                Design Ideas
              </Button>
              {isDropdownOpen && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "white",
                    color: "black",
                    mt: 1,
                    p: 1,
                    borderRadius: "4px",
                    boxShadow: 3,
                    zIndex: 1300,
                  }}
                >
                  {designCategories.map((category, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                    >
                      <Typography textAlign="center">{category}</Typography>
                    </MenuItem>
                  ))}
                </Box>
              )}
            </Box>

            <Button
              component={NavLink}
              to="/about-us"
              sx={{ color: "inherit" }}
            >
              About Us
            </Button>
            <Button
              component={NavLink}
              to="/how-its-work"
              sx={{ color: "inherit" }}
            >
              How it Works
            </Button>
            <Button
              component={NavLink}
              to="/contactus"
              sx={{ color: "inherit" }}
            >
              Contact
            </Button>
          </Box>

          {/* Profile and Mobile Menu Icon on the Right Side */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}
          >
            {token && userDetails ? (
              <>
                {/* Profile Icon with UI Avatar */}

                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src={userDetails?.ProfilePicture} />
                </IconButton>

                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{
                    mt: "10px",
                    zIndex: 1400,
                  }}
                >
                  <MenuItem
                    component={NavLink}
                    to="/dashboard"
                    onClick={handleCloseUserMenu}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    component={NavLink}
                    to="/dashboard/setting"
                    onClick={handleCloseUserMenu}
                  >
                    Setting
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpenNavMenu}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Desktop Login/Signup */}
            {!token && (
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                <Button
                  component={NavLink}
                  to="/login"
                  sx={{ color: "inherit" }}
                >
                  Login
                </Button>
                <Button
                  component={NavLink}
                  to="/signup"
                  sx={{ color: "inherit" }}
                >
                  Signup
                </Button>
              </Box>
            )}
          </Box>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuItem component={NavLink} to="/" onClick={handleCloseNavMenu}>
              Home
            </MenuItem>
            <MenuItem onClick={handleDesignIdeasClick}>Design Ideas</MenuItem>
            <MenuItem
              component={NavLink}
              to="/about-us"
              onClick={handleCloseNavMenu}
            >
              About Us
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/how-its-work"
              onClick={handleCloseNavMenu}
            >
              How it Works
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/contactus"
              onClick={handleCloseNavMenu}
            >
              Contact
            </MenuItem>
            {!token && (
              <>
                <MenuItem
                  component={NavLink}
                  to="/login"
                  onClick={handleCloseNavMenu}
                >
                  Login
                </MenuItem>
                <MenuItem
                  component={NavLink}
                  to="/signup"
                  onClick={handleCloseNavMenu}
                >
                  Signup
                </MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

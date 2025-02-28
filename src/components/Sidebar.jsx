import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const Sidebar = ({ open, toggleSidebar }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { name: "Employees", icon: <PeopleIcon />, path: "/employees" },
    { name: "Departments", icon: <WorkIcon />, path: "/departments" },
    { name: "Analytics", icon: <AnalyticsIcon />, path: "/analytics" },
    { name: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      toggleSidebar();
    }
  };

  const drawer = (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={currentUser?.avatar}
          alt={currentUser?.name}
          sx={{ width: 80, height: 80, mb: 2 }}
        />
        <Typography variant="h6" noWrap component="div" align="center">
          {currentUser?.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          component="div"
          align="center"
        >
          {currentUser?.role.charAt(0).toUpperCase() +
            currentUser?.role.slice(1)}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
                borderRadius: "0 20px 20px 0",
                mr: 1,
                ml: 1,
                mt: 0.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? "white" : "inherit",
                  minWidth: "40px",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2 }}>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          align="center"
        >
          HR Analytics v1.0.0
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          align="center"
          color="text.secondary"
        >
          © {new Date().getFullYear()} AnkitKumarGupta
        </Typography>
      </Box>
    </>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={toggleSidebar}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          boxShadow: 3,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;

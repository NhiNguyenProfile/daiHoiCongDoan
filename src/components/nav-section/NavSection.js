import PropTypes from "prop-types";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
// @mui
import { Box, Container, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import { onAuthStateChanged, signInAnonymously, signOut } from "firebase/auth";
import { auth } from "src/config/firebase";
import { set } from "lodash";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};


function NavItem({ item }) {

  
  const { title, path, icon, info, navigateInfo } = item;

  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    localStorage.clear();
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 500)
  };

  return (
    <div>
      {path ? (
        <StyledNavItem
          component={RouterLink}
          to={path}
          sx={{
            "&.active": {
              color: "#242423",
              bgcolor: "action.selected",
              fontWeight: "fontWeightBold",
            },
          }}
        >
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

          <ListItemText disableTypography primary={title} />

          {info && info}
        </StyledNavItem>
      ) : (
        <StyledNavItem
          component={RouterLink}
          to={navigateInfo}
          onClick={logout}
          sx={{
            "&.active": {
              color: "#242423",
              bgcolor: "action.selected",
              fontWeight: "fontWeightBold",
            },
          }}
        >
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

          <ListItemText disableTypography primary={title} />

          {info && info}
        </StyledNavItem>
      )}
    </div>
  );
}

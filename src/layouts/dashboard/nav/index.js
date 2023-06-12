import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
// mock
import account from "../../../_mock/account";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components

import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
//
import navConfig from "./config";
import navConfigAdmin from "./adminConfig";
import Logo from "src/components/logo/Logo";
import { set } from "lodash";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: "#fff",
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};


export default function Nav({ openNav, onCloseNav }) {
  const [configNav, setConfigNav] = useState("admin");

  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  document.addEventListener("reloadNav", (e) => {
    let token = localStorage.getItem("Token");
    if (token != "ADMIN" && token != undefined) {
      setConfigNav("user");
    } else if (token == "ADMIN" && token != undefined) {
      setConfigNav("admin");
    }
  });

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              height: "100vh",
              width: NAV_WIDTH - 10,
              // backgroundImage: "url('/assets/illustrations/VietNam.svg')",
              borderRadius: "0 10px 10px 0",
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            },
          }}
        >
          <Scrollbar
            sx={{
              height: 1,
              "& .simplebar-content": {
                height: 1,
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {/* <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', justifyContent: "center"}}>
     <Logo />
   </Box> */}

            <Box sx={{ mb: 5, mx: 2.5, mt: 5 }}>
              <Link underline="none">
                <StyledAccount>
                  <Avatar
                    src={
                      "https://lh3.googleusercontent.com/XpoM86_fgcDAZI4R87gVUdJs6etNjQ1TpNlYfLt5T7GvqoWoLnwAtNevdQyHNujYgT-rtXPmAJqfvs30wh8RLMfPR0pcVKN8HDf7-Yqy7TbKd_AN1e3yM-GHI1eSywuNEvSmhxc7=w2400"
                    }
                    alt="photoURL"
                  />

                  <Box sx={{ ml: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#000", fontWeight: "bold" }}
                    >
                      {"Đại Hội Công Đoàn Viên Chức"}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#E8EDDF" }}>
                      {account.role}
                    </Typography>
                  </Box>
                </StyledAccount>
              </Link>
            </Box>

            <NavSection data={localStorage.getItem("Token") != "ADMIN" ? navConfig : navConfigAdmin} />

            {/* <img src="/assets/illustrations/VietNam.svg" style={{width: "500px", opacity: "0.5"}}></img> */}

            <Box sx={{ flexGrow: 1 }} />
          </Scrollbar>
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "#fff",
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            },
          }}
        >
          <Scrollbar
            sx={{
              height: 1,
              "& .simplebar-content": {
                height: 1,
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {/* <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', justifyContent: "center"}}>
     <Logo />
   </Box> */}

            <Box sx={{ mb: 5, mx: 2.5, mt: 5 }}>
              <Link underline="none">
                <StyledAccount>
                  <Avatar
                    src={
                      "https://lh3.googleusercontent.com/XpoM86_fgcDAZI4R87gVUdJs6etNjQ1TpNlYfLt5T7GvqoWoLnwAtNevdQyHNujYgT-rtXPmAJqfvs30wh8RLMfPR0pcVKN8HDf7-Yqy7TbKd_AN1e3yM-GHI1eSywuNEvSmhxc7=w2400"
                    }
                    alt="photoURL"
                  />

                  <Box sx={{ ml: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#000", fontWeight: "bold" }}
                    >
                      {"Đại Hội Công Đoàn Viên Chức"}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#E8EDDF" }}>
                      {account.role}
                    </Typography>
                  </Box>
                </StyledAccount>
              </Link>
            </Box>
            <NavSection data={localStorage.getItem("Token") != "ADMIN" ? navConfig : navConfigAdmin} />

            {/* <img src="/assets/illustrations/VietNam.svg" style={{width: "500px", opacity: "0.5"}}></img> */}

            <Box sx={{ flexGrow: 1 }} />
          </Scrollbar>
        </Drawer>
      )}
    </Box>
  );
}

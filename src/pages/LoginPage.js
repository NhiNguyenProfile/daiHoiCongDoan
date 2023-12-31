import { Helmet } from "react-helmet-async";
import { signInAnonymously, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  Card,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components

import Iconify from "../components/iconify";
// sections
import { LoginForm } from "../sections/auth/login";
import Logo from "src/components/logo/Logo";
import { Navigate, useNavigate } from "react-router-dom";
import storeAccount, { getUser } from "src/_mock/account";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 800,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "60vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));

// ----------------------------------------------------------------------
export default function LoginPage() {
  const mdUp = useResponsive("up", "md");
  const navigate = useNavigate();

  const signInAnonymous = () => {
    signInAnonymously(auth)
      .then(() => {
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        localStorage.setItem('user', uid);
        navigate("/dashboard/checkIn", { replace: true });
      } else {
        if (localStorage.getItem("Token") == "ADMIN") {
          document.dispatchEvent(new CustomEvent("reloadNav"));
          setTimeout(() => {
            navigate("/dashboard/app", { replace: true });
          }, 500);
        }
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> Đại Hội Công Đoàn Viên Chức </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img
              src="https://lh3.googleusercontent.com/XpoM86_fgcDAZI4R87gVUdJs6etNjQ1TpNlYfLt5T7GvqoWoLnwAtNevdQyHNujYgT-rtXPmAJqfvs30wh8RLMfPR0pcVKN8HDf7-Yqy7TbKd_AN1e3yM-GHI1eSywuNEvSmhxc7=w2400"
              alt="logo Đại Biểu Công Chức"
              style={{ height: "15vh", width: "15vh" }}
            />
            <h1
              style={{
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <strong style={{ fontWeight: "900" }}>
                ĐẠI HỘI CÔNG ĐOÀN VIÊN CHỨC
              </strong>
              <p style={{ opacity: "0.6", fontSize: "4vh" }}>
                NHIỆM KÌ IV 2023-2028
              </p>
            </h1>
          </StyledSection>
        )}

        <Card
          style={{
            marginTop: "5vh",
            marginRight: "3vw",
            marginLeft: "2vw",
            marginBottom: "5vh",
          }}
        >
          <Container>
            <StyledContent>
              <Stack
                direction="column"
                spacing={2}
                alignItems={"center"}
                padding={"20px"}
              >
                <img
                  src="https://lh3.googleusercontent.com/XpoM86_fgcDAZI4R87gVUdJs6etNjQ1TpNlYfLt5T7GvqoWoLnwAtNevdQyHNujYgT-rtXPmAJqfvs30wh8RLMfPR0pcVKN8HDf7-Yqy7TbKd_AN1e3yM-GHI1eSywuNEvSmhxc7=w2400"
                  alt="logo Đại Biểu Công Chức"
                  style={{ height: "10vh", width: "10vh" }}
                />
                <h1
                  style={{
                    color: "#2f2f2f",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "3.5vh",
                  }}
                >
                  <strong style={{ fontWeight: "900" }}>
                    ĐẠI HỘI CÔNG ĐOÀN VIÊN CHỨC
                  </strong>
                  <p style={{ opacity: "0.6", fontSize: "2.5vh" }}>
                    NHIỆM KÌ IV 2023-2028
                  </p>
                </h1>
              </Stack>

              <Stack direction="row" spacing={0}>
                <Button
                  fullWidth
                  size="large"
                  style={{
                    backgroundColor: "#FFC107",
                    boxShadow:
                      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                    padding: "10px 0",
                  }}
                  onClick={signInAnonymous}
                >
                  <Typography
                    style={{
                      fontWeight: "800",
                      color: "#FFF",
                    }}
                  >
                    Đăng nhập với vai trò đại biểu
                  </Typography>
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  HOẶC
                </Typography>
              </Divider>

              <LoginForm />
            </StyledContent>
          </Container>
        </Card>
      </StyledRoot>
    </>
  );
}

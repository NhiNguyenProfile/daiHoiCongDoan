import { useTheme } from "@mui/material/styles";
import { BlogPostCard } from "../sections/@dashboard/blog";
// mock
import currentPerson from "../_mock/checkIn.js";
import {
  AppCurrentVisits,
  AppWidgetSummary,
} from "src/sections/@dashboard/app";

import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Grid,
} from "@mui/material";
// components
import Label from "../components/label";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import { Navigate, useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Documents() {
  useEffect(() => {
    var iframe = document.getElementById("the-iframe");
    var style = document.createElement("style");
    style.textContent =
      "body {" +
      "  ;" +
      "  background-image: some-image;" +
      "}";
    iframe.contentDocument.head.appendChild(style);
  }, []);
  return (
    <>
      <Helmet>
        <title>Báo cáo điểm danh</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontWeight: "900", color: "white", fontSize: "5vh" }}
          >
            Tài liệu đại hội
          </Typography>
        </Stack>
        <Card>
          <iframe
            src="https://drive.google.com/embeddedfolderview?id=1fWdbukxU4TR6f3QHkDoZnh57q7-Ilz7T#grid"
            style={{ width: "100%", border: "none", height: "70vh" }}
            id="the-iframe"
          ></iframe>
        </Card>
      </Container>
    </>
  );
}

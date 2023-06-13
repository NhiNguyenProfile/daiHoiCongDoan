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

export default function ImageAndVideo() {
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
            Hình ảnh và video
          </Typography>
        </Stack>
        <Card>
          <iframe src="https://drive.google.com/embeddedfolderview?id=1YYc-_GCSl0SX9Vxv96UeSRhxr4I511t1#grid" style={{width: "100%", border: "none", height: "70vh"}}></iframe>
        </Card>
      </Container>
    </>
  );
}

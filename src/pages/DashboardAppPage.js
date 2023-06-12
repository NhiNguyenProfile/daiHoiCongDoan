import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet-async";
import { Card, Container, Grid, Typography, Button } from "@mui/material";
import {
  AppCurrentVisits,
  AppWidgetSummary,
} from "src/sections/@dashboard/app";
import { useTheme } from "@emotion/react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser } from "src/_mock/account";
import { getAuth } from "firebase/auth";

function createData(id, idea) {
  return { id, idea };
}

const rows = [
  createData(0, "Frozen yoghurt"),
  createData(1, "Ice cream sandwich"),
  createData(2, "Eclair"),
];

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  
  return (
    <>
      {/* {user == undefined ? <Navigate to="/login" /> : null} */}

      <Helmet>
        <title> Quản lí đại hội </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid
            item
            xs={12}
            sm={3}
            md={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <AppWidgetSummary
              title="Người sử dụng ứng dụng"
              total={714000}
              color="#fff"
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={3}>
            <AppWidgetSummary
              title="Lần biểu quyết"
              total={1352831}
              color="#fff"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={3}>
            <AppWidgetSummary
              title="Người hiện diện"
              total={1723315}
              color="#fff"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={3}>
            <AppWidgetSummary
              title="Hiện diện"
              total={23.5}
              color="#fff"
              icon={"ant-design:bug-filled"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <TableContainer
              component={Paper}
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              }}
            >
              <Table sx={{ minWidth: 500 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "150px" }} align="center">
                      <Typography style={{ fontWeight: "800" }}>
                        Số thứ tự
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontWeight: "800" }} align="center">
                        Góp ý
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row" align="center">
                        <Typography style={{ fontWeight: "800" }}>
                          {row.id}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.idea}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <TableContainer
              component={Paper}
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              }}
            >
              <Table sx={{ minWidth: 500 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "150px" }} align="center">
                      <Typography style={{ fontWeight: "800" }}>
                        Số thứ tự
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontWeight: "800" }} align="center">
                        Thư gửi đại hội
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontWeight: "800" }} align="center">
                        Tệp đính kèm
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row" align="center">
                        <Typography style={{ fontWeight: "800" }}>
                          {row.id}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.idea}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="large"
                          style={{
                            boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                            borderRadius: "5px",
                            padding: "10px 20px",
                            backgroundColor: "#ffefbe",
                            color: "#e4ab00",
                          }}
                        >
                          <Typography
                            style={{ fontWeight: "900" }}
                          >
                            Xem tài liệu
                          </Typography>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

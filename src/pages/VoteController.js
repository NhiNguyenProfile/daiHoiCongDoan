import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography, Stack, Button } from "@mui/material";
// components
import Iconify from "../components/iconify";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser } from "src/_mock/account";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function VoteController() {
  const theme = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <>
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
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              style={{
                fontWeight: "900",
                color: "white",
                fontSize: "5vh",
                width: "60%",
              }}
            >
              Quản lý biểu quyết
            </Typography>
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "end",
              }}
            >
              <Button
                startIcon={<Iconify icon="eva:plus-fill" />}
                style={{
                  boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                  borderRadius: "500px",
                  padding: "15px",
                  marginBottom: "10px",
                  backgroundColor: "#ffc107",
                  color: "#fff",
                }}
              >
                <Typography variant="p" noWrap style={{ fontWeight: "900" }}>
                Tạo nhiệm kì mới
                </Typography>
              </Button>
              <Button
                startIcon={<Iconify icon="eva:plus-fill" />}
                style={{
                  boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                  borderRadius: "500px",
                  padding: "15px",
                  backgroundColor: "#ffefbe",
                  color: "#e4ab00",
                }}
              >
                <Typography variant="p" noWrap style={{ fontWeight: "900" }}>
                Tạo biểu quyết
                </Typography>
              </Button>
            </Container>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Tỉ lệ biểu quyết hiện tại"
              chartData={[
                { label: "Không đồng thuận", value: 5435 },
                { label: "Đồng Thuận", value: 4344 },
              ]}
              chartColors={[
                theme.palette.warning.main,
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
              ]}
              type="donut"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Tổng kết biểu quyết"
              subheader="Tỉ lệ đổng thuận theo đợt biểu quyết"
              chartLabels={[
                "Đợt 1",
                "Đợt 2",
                "Đợt 3",
                "Đợt 4",
                "Đợt 5",
                "Đợt 6",
                "Đợt 7",
                "Đợt 8",
                "Đợt 9",
                "Đợt 10",
              ]}
              chartData={[
                {
                  name: "Phiếu đồng thuận",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27],
                },
                {
                  name: "Phiếu không đồng thuận",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36],
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

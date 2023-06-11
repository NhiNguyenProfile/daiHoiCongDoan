import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
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
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser } from "src/_mock/account";
import { getAuth } from "firebase/auth";

// ----------------------------------------------------------------------

export default function Vote() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCancle = () => {
    setOpenDialog(false);
  };

  const handleAccept = () => {
    setOpenDialog(false);
  };
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
              Biểu quyết
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
                startIcon={<Iconify icon="ic:twotone-how-to-vote" />}
                style={{
                  boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                  borderRadius: "500px",
                  padding: "15px",
                  marginBottom: "10px",
                  backgroundColor: "#ffefbe",
                  color: "#e4ab00",
                }}
                onClick={handleClickOpen}
              >
                <Typography variant="p" noWrap style={{ fontWeight: "900" }}>
                  Biểu quyết
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

        <Dialog open={openDialog} onClose={handleCancle}>
          <DialogTitle
            style={{
              fontSize: "1.5rem",
            }}
          >
            Thêm đại biểu
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Điền đầy đủ thông tin của đại biểu vào form bên dưới và nhấn vào
              nút thêm vào danh sách
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="code"
              label="Mã"
              type="text"
              fullWidth
              variant="standard"
              style={{ fontFamily: "'Montserrat', sans-serif !important" }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Họ và tên"
              type="text"
              fullWidth
              variant="standard"
              style={{ fontFamily: "'Montserrat', sans-serif !important" }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="role"
              label="Vai trò"
              type="text"
              fullWidth
              variant="standard"
              style={{ fontFamily: "'Montserrat', sans-serif !important" }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancle}
              style={{
                boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#fff",
                color: "#ffc107",
              }}
            >
              <Typography style={{ fontWeight: "800" }}>Hủy</Typography>
            </Button>
            <Button
              onClick={handleAccept}
              style={{
                boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#ffc107",
                color: "#fff",
              }}
            >
              <Typography style={{ fontWeight: "800" }}>Thêm vào danh sách</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

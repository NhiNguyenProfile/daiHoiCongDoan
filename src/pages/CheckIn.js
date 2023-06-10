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
import { useState } from "react";
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
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser } from "src/_mock/account";
import { getAuth } from "firebase/auth";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "name", label: "Họ và tên", alignRight: false },
  { id: "company", label: "Chức danh", alignRight: false },
  { id: "role", label: "Vai trò", alignRight: false },
  { id: "isVerified", label: "Mã", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function CheckIn() {
  const theme = useTheme();
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );
  

  
  const isNotFound = !filteredUsers.length && !!filterName;
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
            Báo cáo điểm danh
          </Typography>
        </Stack>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Tổng kết điểm danh"
              chartData={[
                { label: "Vắng", value: 7 },
                { label: "Hiện diện", value: 30 },
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
          <Grid item xs={12} sm={6} md={8}>
            {/* <Typography variant="h3" sx={{fontSize:"30px", fontWeight:"900", color: "#fff"}}>Đã điểm danh:</Typography>
            <BlogPostCard
              key={currentPerson.code}
              currentPerson={currentPerson}
              index={0}
            /> */}
            <Container>
              <Card>
                <UserListToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={USERLIST.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {filteredUsers
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            const {
                              id,
                              name,
                              role,
                              status,
                              company,
                              avatarUrl,
                              isVerified,
                            } = row;
                            const selectedUser = selected.indexOf(name) !== -1;

                            return (
                              <TableRow
                                hover
                                key={id}
                                tabIndex={-1}
                                role="checkbox"
                                selected={selectedUser}
                              >
                                <TableCell padding="checkbox"></TableCell>

                                <TableCell
                                  component="th"
                                  scope="row"
                                  padding="none"
                                >
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <Avatar alt={name} src={avatarUrl} />
                                    <Typography
                                      style={{ fontWeight: "800" }}
                                      noWrap
                                    >
                                      {name}
                                    </Typography>
                                  </Stack>
                                </TableCell>

                                <TableCell align="left">
                                  <Typography>{company}</Typography>
                                </TableCell>

                                <TableCell align="left">
                                  <Typography>{role}</Typography>
                                </TableCell>

                                <TableCell align="left">
                                  <Typography>
                                    {isVerified ? "Yes" : "No"}
                                  </Typography>
                                </TableCell>

                                <TableCell align="left">
                                  <Label
                                    color={
                                      (status === "banned" && "error") ||
                                      "success"
                                    }
                                  >
                                    <Typography>
                                      {sentenceCase(status)}
                                    </Typography>
                                  </Label>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 20 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>

                      {isNotFound && (
                        <TableBody>
                          <TableRow>
                            <TableCell
                              align="center"
                              colSpan={6}
                              sx={{ py: 3 }}
                            >
                              <Paper
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                <Typography variant="h6" paragraph>
                                  Not found
                                </Typography>

                                <Typography variant="body2">
                                  No results found for &nbsp;
                                  <strong>&quot;{filterName}&quot;</strong>.
                                  <br /> Try checking for typos or using
                                  complete words.
                                </Typography>
                              </Paper>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Scrollbar>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={USERLIST.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

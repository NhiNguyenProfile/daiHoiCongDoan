import { Helmet } from "react-helmet-async";
import { filter, set } from "lodash";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
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
import {ref, onValue, get, child, getDatabase} from "firebase/database";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "Mã Số ĐB", alignRight: false },
  { id: "name", label: "Họ và tên", alignRight: false },
  { id: "cdcs", label: "CĐCS", alignRight: false },
  { id: "workplace", label: "Chức vụ, Đơn vị công tác", alignRight: false },
];



const dbRef = ref(getDatabase());
let users = [];


get(child(dbRef, `16Po4bHTR9VUAKvcS2SsiSNZlcov7ygvpMJND6-hrM7o/users`)).then((snapshot) => {
  if (snapshot.exists()) {
    snapshot.forEach((user) => {
      users.push(user.val());
    })
    
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

console.log("===============================")



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
export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [change, setChange] = useState(false)

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("id");

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
      const newSelecteds = users.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  //----------------------------------------------------------------

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

  //----------------------------------------------------------------
  setTimeout(() => {
    setChange(!change);
  }, 100)

  setTimeout(() => {
    setChange(!change);
  }, 200)

  
  return (
    <>
      <Helmet>
        <title>Danh sách đại biểu</title>
      </Helmet>

      <Container status={change}>
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
            Danh sách đại biểu
          </Typography>
          {/* <Button
            variant="outlined"
            onClick={handleClickOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
            style={{
              boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
              borderRadius: "500px",
              padding: "10px 0 10px 10px",
              backgroundColor: "#ffc107",
              color: "#fff",
            }}
          ></Button> */}
        </Stack>

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
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        name,
                        cdcs,
                        workplace,
                        avatarUrl,
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
                          <TableCell align="left"><Typography>{id}</Typography></TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography style={{fontWeight: "800"}} noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left"><Typography>{cdcs}</Typography></TableCell>

                          <TableCell align="left"><Typography>{workplace}</Typography></TableCell>

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
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Không tìm thấy
                          </Typography>

                          <Typography variant="body2">
                            Không có kết quả cho &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Thử tìm kiếm lại với tên đầy đủ
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
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            backgroundColor: "#fff",
            boxShadow:
              "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Sửa
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>

      <Dialog open={openDialog} onClose={handleCancle}>
        <DialogTitle style={{
              fontSize: "1.5rem"
            }}>Thêm đại biểu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Điền đầy đủ thông tin của đại biểu vào form bên dưới và nhấn vào nút
            thêm vào danh sách
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
    </>
  );
}

import { Helmet } from "react-helmet-async";
// @mui
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  TextareaAutosize,
  styled,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { MuiFileInput } from "mui-file-input";
import { getUser } from "src/_mock/account";
import { getAuth } from "firebase/auth";
import { getDatabase, set, ref, get, child, onValue } from "firebase/database";
import { storage } from "src/config/firebase";
import { ref as refS, uploadBytes } from "firebase/storage";
import swal from "sweetalert";
import { Toaster, toast } from "react-hot-toast";

// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
// import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------
const user = getUser();

// ----------------------------------------------------------------------

export default function Mail() {
  const [mail, setMail] = useState("");
  const length = useRef(0);

  const StyledTextarea = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    padding: "1rem",
    color: "black",
    backgroundColor: "#fff",
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    borderRadius: "10px",
  };

  const StyledInputFile = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    color: "black",
    backgroundColor: "#fff",
    outline: "",
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    borderRadius: "10px",
  };

  const StyledButton = {
    boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#ffc107",
    color: "#fff",
  };
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  const dbRef = ref(
    getDatabase(),
    "mail"
  );
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      length.current = Object.keys(data).length;
    } else {
      length.current = 0;
    }
  });

  const handleClick = () => {
    const db = getDatabase();
    const reference = ref(db, "mail/" + (length.current + 1));
    if (mail.length > 0) {
      if (file) {
        const refFile = refS(storage, `mail/${file.name}`);
        uploadBytes(refFile, file)
          .then((snapshot) => {
            setFile(null);
          })
          .catch((error) => {
            console.log(error);
          });
          setFile(null);
        set(reference, {
          message: mail,
          file: file.name,
        });
        setMail("");
      } else {
        set(reference, {
          message: mail,
          file: "",
        });
        setMail("");
      }
      toast.success("Gửi thành công!");
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  const resetFrom = () => {
    setFile(null);
    setMail("");
  };

  return (
    <>
      <Helmet>
        <title>Thư gửi đại hội</title>
      </Helmet>

      <Container>
        <Toaster />
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
            Thư gửi đại hội
          </Typography>
        </Stack>

        <Stack spacing={3}>
          <TextareaAutosize
            name="email"
            aria-label="minimum height"
            minRows={4}
            placeholder="Hãy nhập lời nhắn vào đây"
            style={StyledTextarea}
            onChange={(e) => {
              setMail(e.target.value);
            }}
            value={mail}
          />

          <MuiFileInput
            value={file}
            onChange={handleChange}
            size="large"
            variant="outlined"
            placeholder="Chọn file"
            style={StyledInputFile}
            id="file"
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleClick}
            style={StyledButton}
          >
            <Typography
              style={{
                fontWeight: "900",
              }}
            >
              Gửi
            </Typography>
          </LoadingButton>

          <Button
            fullWidth
            size="large"
            style={{
              boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "#ffefbe",
              color: "#e4ab00",
            }}
            onClick={resetFrom}
          >
            <Typography variant="p" noWrap style={{ fontWeight: "900" }}>
              Đặt lại
            </Typography>
          </Button>
        </Stack>
      </Container>
    </>
  );
}

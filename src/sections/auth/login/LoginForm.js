import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/config/firebase";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate("/dashboard/app", { replace: true });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    if (email == "daihoicongdoanvienchuc2023" && password == "1234567890") {
      localStorage.setItem("Token", "ADMIN");
      document.dispatchEvent(new CustomEvent("reloadNav"))
      navigate("/dashboard/app", { replace: true });
    } else {

    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Địa chỉ email" onChange={(e) => setEmail(e.target.value)}/>

        <TextField
          name="password"
          label="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={signIn}
          style={{ backgroundColor:"#50a4d7", boxShadow:"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}
        >
          <Typography style={{fontWeight: "800"}}>Đăng nhập</Typography>
        </LoadingButton>
      </Stack>
    </>
  );
}

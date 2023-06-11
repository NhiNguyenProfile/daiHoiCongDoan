import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

localStorage.removeItem("Token");
export default function Logout() {
  const navigate = useNavigate();
  window.location.reload();
  return <></>;
}

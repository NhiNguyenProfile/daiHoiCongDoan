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
import { useEffect, useRef, useState } from "react";
// @mui
import { Card, Container, Grid } from "@mui/material";
// components
import Label from "../components/label";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import { Navigate, useNavigate } from "react-router-dom";
import { child, get, getDatabase, onValue, ref } from "firebase/database";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const dbRef = ref(getDatabase());

// ----------------------------------------------------------------------

export default function CheckIn() {
  const theme = useTheme();
  const [present, setPresent] = useState(0);
  const user = useRef();
  const [presentUser, setPresentUser] = useState(() => {
    get(
      child(dbRef, "144piK-psVVvdqRsuBe0suA2sIAnpaqR48T23lTqQV50/currentUser")
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          user.current = USERLIST[Number(snapshot.val()) - 1];
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return user.current;
  });

  const [change, setChange] = useState("yes");

  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(
      getDatabase(),
      "144piK-psVVvdqRsuBe0suA2sIAnpaqR48T23lTqQV50/currentUser"
    );
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPresentUser(USERLIST[Number(data) - 1]);
      }
    });
    console.log(presentUser);
  }, [presentUser]);

  //----------------------------------------------------------------
  setTimeout(() => {
    setChange("no");
  }, 100);

  setTimeout(() => {
    setChange("yes");
  }, 200);
  return (
    <>
      <Helmet>
        <title>Báo cáo điểm danh</title>
      </Helmet>
      <Container status={change}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          {presentUser ? (
            <Card style={{ padding: "10%"}}>
              <img src={presentUser.avatarUrl}></img>
              <h2 style={{ fontSize: "4vh" }}>{presentUser.id}</h2>
              <h1 style={{ fontSize: "4vh" }}>{presentUser.name}</h1>
              <h3 style={{ fontSize: "2vh" }}>{presentUser.workplace}</h3>
              <h2 style={{ fontSize: "2vh" }}>{presentUser.cdcs}</h2>
            </Card>
          ) : null}
          
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          {presentUser ? (
            <Card style={{ padding: "10%"}}>
              <img src={presentUser.avatarUrl}></img>
              <h2 style={{ fontSize: "4vh" }}>{presentUser.id}</h2>
              <h1 style={{ fontSize: "4vh" }}>{presentUser.name}</h1>
              <h3 style={{ fontSize: "2vh" }}>{presentUser.workplace}</h3>
              <h2 style={{ fontSize: "2vh" }}>{presentUser.cdcs}</h2>
            </Card>
          ) : null}
          
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          {presentUser ? (
            <Card style={{ padding: "10%"}}>
              <img src={presentUser.avatarUrl}></img>
              <h2 style={{ fontSize: "4vh" }}>{presentUser.id}</h2>
              <h1 style={{ fontSize: "4vh" }}>{presentUser.name}</h1>
              <h3 style={{ fontSize: "2vh" }}>{presentUser.workplace}</h3>
              <h2 style={{ fontSize: "2vh" }}>{presentUser.cdcs}</h2>
            </Card>
          ) : null}
          
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          {presentUser ? (
            <Card style={{ padding: "10%"}}>
              <img src={presentUser.avatarUrl}></img>
              <h2 style={{ fontSize: "4vh" }}>{presentUser.id}</h2>
              <h1 style={{ fontSize: "4vh" }}>{presentUser.name}</h1>
              <h3 style={{ fontSize: "2vh" }}>{presentUser.workplace}</h3>
              <h2 style={{ fontSize: "2vh" }}>{presentUser.cdcs}</h2>
            </Card>
          ) : null}
          
        </Grid>
        
        </Grid>
      </Container>
    </>
  );
}

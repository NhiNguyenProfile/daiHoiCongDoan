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

function getPresent() {
  let users = [];
  get(child(dbRef, "144piK-psVVvdqRsuBe0suA2sIAnpaqR48T23lTqQV50/currentUsers"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((user) => {
          users.push(USERLIST[Number(user.val().id) - 1]);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return users;
}

export default function CheckIn() {
  const theme = useTheme();
  const [present, setPresent] = useState(0);
  const user = useRef();
  const [presentUser, setPresentUser] = useState(getPresent());

  const [change, setChange] = useState("yes");

  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(
      getDatabase(),
      "144piK-psVVvdqRsuBe0suA2sIAnpaqR48T23lTqQV50/currentUsers"
    );
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPresent(Object.keys(data).length);
        let presentNow = [];
        Object.keys(data).forEach((key) => {
          presentNow.push(USERLIST[Number(key) - 1]);
        });
        setPresentUser(presentNow);
      }
    });
  }, [present]);

  //----------------------------------------------------------------
  setTimeout(() => {
    setChange("no");
    setPresentUser(getPresent());
  }, 1000);

  setTimeout(() => {
    setChange("yes");
    setPresentUser(getPresent());
  }, 2000);
  return (
    <>
      <Helmet>
        <title>Báo cáo điểm danh</title>
      </Helmet>
      <Container status={change}>
        <Grid container spacing={8} display="flex" justifyContent="center">
          {console.log(presentUser.length)}
          {presentUser.length > 0
            ? presentUser.map((user) => (
                <Grid item xs={12} md={6} lg={5}>
                  {user != undefined ? (
                    <Card style={{ padding: "10%" }}>
                      <img src={user.avatarUrl}></img>
                      <h2 style={{ fontSize: "4vh" }}>{user.id}</h2>
                      <h1 style={{ fontSize: "4vh" }}>{user.name}</h1>
                      <h3 style={{ fontSize: "2vh" }}>{user.workplace}</h3>
                      <h2 style={{ fontSize: "2vh", fontWeight: "500" }}>
                        {user.cdcs}
                      </h2>
                    </Card>
                  ) : null}
                </Grid>
              ))
            : null}
        </Grid>
      </Container>
    </>
  );
}

import React, { useEffect } from "react";
import Grid from "../../grid-system/Grid";
import Row from "../../grid-system/Row";
import Column from "../../grid-system/Column";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./Home.css";

function HomePage() {
  useEffect(() => {
    document.title = "Home - Lecturer Appoinment Schedule";
    document.body.style.background = "hsl(218, 21%, 90%)";
    return (() => {
      document.body.style = null
    })
  }, []);

  const rowClasslist = ["no-gutters", "container"];
  const navbarClasslist = ["mobile-12"]
  const contentClassList = ["pc-10", "pc-offset-1", "mobile-12"];

  return (
    <Grid id="home-page">
      <Row classList={rowClasslist}>
        <div className="overlay"></div>
        <Column classList={navbarClasslist}>
          <Navbar></Navbar>
        </Column >
        <Sidebar></Sidebar>
        <Column classList={contentClassList}>
          <Content></Content>
        </Column>
      </Row>
    </Grid>
  );
}

export default HomePage;

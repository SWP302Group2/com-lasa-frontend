import GridWide from "../../grid-system/GridWide";
import Row from "../../grid-system/Row";
import Column from "../../grid-system/Column";
import Content from "./Content";
import { useEffect } from "react";
import "./Signin.css";

function SignInPage() {

  function unColorTheBody() {
    document.documentElement.style = null;
    document.body.style = null;
  }

  function colorTheBody() {
    document.documentElement.style.backgroundImage =
      "linear-gradient(135deg, #d8696d, #ceb270, #86caa1, #15b3d6, #b379cf, #5d87be, #15abcc)";
    document.body.style.background = "rgba(255,255,255,0.8)";
  }

  useEffect(() => {
    document.title = "Sign in to Lasa";
    function handleWindowResize(event) {
      window.matchMedia("(min-width: 768px)").matches ? colorTheBody() : unColorTheBody();
    }

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return (() => {
      window.removeEventListener("resize", handleWindowResize);
      unColorTheBody();
    })
  }, []);

  const rowClassList = ["container"];
  const columnClassList = [
    "large-pc-10",
    "large-pc-offset-1",
    "pc-10",
    "pc-offset-1",
    "mobile-12",
  ];

  return (
    <GridWide id="sign-in-page">
      <Row classList={rowClassList}>
        <Column classList={columnClassList}>
          <Content></Content>
        </Column>
      </Row>
    </GridWide>
  );
}

export default SignInPage;

import Column from "../../grid-system/Column";
import GridWide from "../../grid-system/GridWide";
import "./Signin.css";
import Content from "./Content";
import Row from "../../grid-system/Row";

function SignInPage() {
  document.title = "Sign in to Lasa";
  const responsiveOptions = [
    "large-pc-10",
    "large-pc-offset-1",
    "pc-10",
    "pc-offset-1",
    "tablet-12",
    "mobile-12",
  ];
  return (
    <GridWide>
      <Row>
        <Column classList={responsiveOptions}>
          <Content></Content>
        </Column>
      </Row>
    </GridWide>
  );
}

export default SignInPage;

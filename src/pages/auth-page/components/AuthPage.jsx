import Column from "../../../custome-library/Column";
import Grid from "../../../custome-library/Grid";
import Row from "../../../custome-library/Row";
import Content from "./Content";
import "../css/authPage.css";

function AuthPage() {
  const gridId = "auth-page";
  const gridClassList = [];
  const rowClassList = ["no-gutters"];
  const columnClassList = [
    "mobile-12",
  ];

  return (
    <Grid classList={gridClassList} id={gridId}>
      <Row classList={rowClassList}>
        <div className="fill-backgroundImage-layer"></div>
        <div className="white-overlay"></div>
        <p id="error-message"></p>
        <Column classList={columnClassList}>
          <Content></Content>
        </Column>
      </Row>
    </Grid>
  );
}

export default AuthPage;

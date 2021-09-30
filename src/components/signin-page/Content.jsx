import Column from "../grid-system/Column";
import Row from "../grid-system/Row";
import Introduce from "./Introduce";
import SignInBox from "./SignInBox";

function SignInContent() {
  var rowClassList = ["container"];
  var columnResponsive = ["pc-6", "tablet-6", "mobile-12"];
  return (
    <Row classList={rowClassList} noGutter={true}>
      <Column classList={columnResponsive}>
        <Introduce />
      </Column>
      <Column classList={columnResponsive}>
        <SignInBox />
      </Column>
    </Row>
  );
}

export default SignInContent;

// <div class="col pc-6 tablet-6 mobile-12">

//     </div>
//     <div class="col pc-6 tablet-6 mobile-12">

//     </div>

import Column from "../../grid-system/Column";
import Row from "../../grid-system/Row";
import Introduce from "./Introduce";
import SignInBox from "./SignInBox";

function SignInContent() {
  var rowClassList = ["container", "no-gutters"];
  var introduceResponsive = ["large-pc-7", "pc-6", "tablet-6", "mobile-12"];
  var signInResponsive = ["large-pc-5", "pc-6", "tablet-6", "mobile-12"];
  return (
    <Row classList={rowClassList}>
      <Column classList={introduceResponsive}>
        <Introduce />
      </Column>
      <Column classList={signInResponsive}>
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

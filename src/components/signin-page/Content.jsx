import Row from "../../grid-system/Row";
import Column from "../../grid-system/Column";
import Introduce from "./Introduce";
import SignInBox from "./SignInBox";

function SignInContent() {
  var rowClassList = ["container", "no-gutters"];
  var introduceClassList = ["large-pc-7", "pc-6", "tablet-6", "mobile-12"];
  var signInClassList = ["large-pc-5", "pc-6", "tablet-6", "mobile-12"];
  return (
    <Row classList={rowClassList}>
      <Column classList={introduceClassList}>
        <Introduce />
      </Column>
      <Column classList={signInClassList}>
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

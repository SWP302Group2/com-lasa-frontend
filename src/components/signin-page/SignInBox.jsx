import SignInGoogle from "./SignInGoogle";
import SignInLocalForm from "./SignInLocalForm";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function SignInBox() {
  return (
    <div className="sign-in">
      <Link to="/home">
        <Logo />
      </Link>
      <SignInLocalForm />
      <SignInGoogle />
    </div>
  );
}

export default SignInBox;

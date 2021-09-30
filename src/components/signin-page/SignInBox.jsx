import SignInGoogle from "./SignInGoogle";
import SignInLocalForm from "./SignInLocalForm";
import Logo from "./Logo";

function SignInBox() {
  return (
    <div className="sign-in">
      <Logo />
      <SignInLocalForm />
      <SignInGoogle />
    </div>
  );
}

export default SignInBox;

import SignInGoogle from "./SignInGoogle";
import SignInLocalForm from "./SignInLocalForm";

function SignInBox() {
  return (
    <div className="sign-in">
      <SignInLocalForm />
      <SignInGoogle />
    </div>
  );
}

export default SignInBox;

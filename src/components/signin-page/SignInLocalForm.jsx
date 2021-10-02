import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosConfig";
import Cookies from "universal-cookie/es6";

function SignInLocalForm() {
  const history = useHistory();

  useEffect(() => handleSignInLocalForm());

  function handleSignInLocalForm() {
    const signInForm = document.querySelector("#form-sign-in");

    function createTokenCookie(cookieInfo) {
      const cookie = new Cookies();
      const { token, ...options } = cookieInfo;
      options.path = "/";
      console.log(options);
      cookie.set("access_token", token, options);
      console.log(cookie.get("access_token"));
    }
    signInForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const api = "/las/api/v1/authentication";
      const data = JSON.stringify({
        username: "admin",
        password: "123",
      });
      axiosInstance
        .post(api, data)
        .then((response) => response.data)
        .then((cookieInfo) => {
          console.log("Login success.");
          console.log(cookieInfo);
          createTokenCookie(cookieInfo);
          history.push("/home");
        })
        .catch((error) => console.log(error));
    });
  }

  return (
    <article className="sign-in__local">
      <h2 className="sign-in__sub-headline sign-in__sub-headline--local">
        Sign in
      </h2>
      <form className="sign-in__form" id="form-sign-in">
        <div className="sign-in__control">
          <input
            className="sign-in__input"
            id="username"
            type="text"
            name="txtUser"
            placeholder=" "
          />
          <label className="sign-in__label" htmlFor="username">
            Username
          </label>
        </div>
        <div className="sign-in__control">
          <input
            className="sign-in__input"
            id="password"
            type="password"
            name="txtPass"
            placeholder=" "
          />
          <label className="sign-in__label" htmlFor="password">
            Password
          </label>
        </div>
        <button className="sign-in__button" name="btAction" value="sign-in">
          Submit
        </button>
      </form>
    </article>
  );
}

export default SignInLocalForm;

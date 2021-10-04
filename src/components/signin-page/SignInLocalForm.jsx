import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosConfig";
import Cookies from "universal-cookie/es6";

function SignInLocalForm() {
  const history = useHistory();

  function createTokenCookie(cookieInfo) {
    const cookie = new Cookies();
    const { token, ...options } = cookieInfo;
    options.path = "/";
    cookie.set("access_token", token, options);
  }

  function processError(...errorData) {
    const errorMessage = document.querySelector(".sign-in__error-message");
    errorMessage.innerHTML = "Your username or password is incorrect.";
    errorMessage.style.display = "inline-block";
    setTimeout(() => {
      hideErrorMessage();
    }, 10000);
  }

  function reAssignUsernameValue(username) {
    document.getElementById("username").value = username;
    document.getElementById("password").value = "";
  }

  function authenticateUser(event) {
    //Stop auto submit
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const api = "/las/api/v1/authentication";
    const data = JSON.stringify({
      username,
      password,
    });
    console.log(data);

    //Call api
    axiosInstance
      .post(api, data)
      .then((response) => response.data)
      .then((cookieInfo) => {
        //Sign in success
        console.log("Sign in successfully.");
        createTokenCookie(cookieInfo);
        history.push("/home");
      })
      .catch((error) => {
        //Sign in failed
        const status = error.state;
        const message = error.message;
        reAssignUsernameValue(username);
        processError(username, status, message);
      });
  }

  function hideErrorMessage() {
    const errorMessage = document.querySelector(".sign-in__error-message");
    if (errorMessage && errorMessage.style.display) {
      errorMessage.innerHTML = "";
      errorMessage.style.display = null;
    }
  }

  function handleSigninLocalForm() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    username.addEventListener("input", hideErrorMessage);
    password.addEventListener("input", hideErrorMessage);

    const form = document.querySelector("#form-sign-in");
    form.addEventListener("submit", authenticateUser);
  }

  useEffect(() => handleSigninLocalForm());

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
            name="username"
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
            name="password"
            placeholder=" "
          />
          <label className="sign-in__label" htmlFor="password">
            Password
          </label>
        </div>
        <button
          className="sign-in__button"
          type="submit"
          name="btAction"
          value="sign-in"
        >
          Submit
        </button>
        <p className="sign-in__error-message"></p>
      </form>
    </article>
  );
}

export default SignInLocalForm;

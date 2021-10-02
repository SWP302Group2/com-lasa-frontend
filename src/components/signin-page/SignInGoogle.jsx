import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie/es6";
// import axios from "axios";
import axiosInstance from "../../utils/axiosConfig.jsx";

const CLIENT_ID =
  "69016056321-5j2fr23vo8oggc3jsqksgu2a4g1s1mhn.apps.googleusercontent.com";

function SignInGoogle() {
  const history = useHistory();

  useEffect(() => insertGapiScript());

  function createTokenCookie(cookieInfo) {
    const cookie = new Cookies();
    const { token, ...options } = cookieInfo;
    options.path = "/";
    console.log(options);
    cookie.set("access_token", token, options);
    console.log(cookie.getAll());
  }

  function onFailure(error) {
    console.log(error);
  }

  function onSignIn(googleUser) {
    console.log(googleUser);
    const api = "/las/api/v1/authentication/google";
    const data = JSON.stringify({
      token: googleUser.getAuthResponse().id_token,
    });

    axiosInstance
      .post(api, data)
      .then((response) => response.data)
      .then((cookieInfo) => {
        console.log(cookieInfo);
        createTokenCookie(cookieInfo);
        history.push("/home");
      })
      .catch((response) =>
        console.log(`Status ${response?.status}, Message ${response?.data}`)
      );
  }

  function attachSignin(myauth2, button) {
    myauth2.attachClickHandler(button, {}, onSignIn, onFailure);
  }

  function initializeGapiAuth2() {
    return window.gapi.auth2.init({
      client_id: CLIENT_ID,
      cookiepolicy: "single_host_origin",
      scope: "profile email",
      access_type: "offline",
    });
  }

  function initializeGoogleSignIn() {
    window.gapi.load("auth2", () => {
      const button = document.getElementById("my-signin2");
      const myauth2 = initializeGapiAuth2();
      attachSignin(myauth2, button);
    });
  }

  function insertGapiScript() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api:client.js";
    script.addEventListener("load", initializeGoogleSignIn);
    document.body.appendChild(script);
  }

  return (
    <article className="sign-in__google">
      <h2 className="sign-in__sub-headline sign-in__sub-headline--google">
        Sign in as Lecturer or Student
      </h2>
      <div className="sign-in__google__button">
        <div id="my-signin2">
          <span className="google-icon"></span>
          <span className="google-text">Sign in with Google</span>
        </div>
      </div>
    </article>
  );
}

export default SignInGoogle;

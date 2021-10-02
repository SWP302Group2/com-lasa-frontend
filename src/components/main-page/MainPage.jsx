import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie/es6";

function MainPage() {
  useEffect(() => callAPI());

  const history = useHistory();
  function callAPI() {
    console.log("Calling api...");
    const cookie = new Cookies();
    const tokenValue = cookie.get("access_token");
    console.log(tokenValue);
    if (tokenValue) {
      const api = "http://localhost:8080/las/api/v1/questions";
      const option = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenValue,
        },
      };

      fetch(api, option)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    } else {
      history.push("/signin");
    }
  }

  return <h1>Welcome</h1>;
}

export default MainPage;

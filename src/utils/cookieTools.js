import Cookies from "universal-cookie/es6";

const cookieTools = {
    saveToken: ({ accessToken, cookieInfo }) => {
        const cookie = new Cookies();
        cookieInfo.path = "/";
        cookie.set("access_token", accessToken, cookieInfo);

        console.log("Cookie has saved: " + cookie.get("access_token"));
    },

    getAccessToken: () => {
        const cookie = new Cookies();
        return cookie.get("access_token");
    },

    removeAccessToken: () => {
        const cookie = new Cookies();
        cookie.set("access_token", "", { maxAge: 0 });
    }
}

export default cookieTools;
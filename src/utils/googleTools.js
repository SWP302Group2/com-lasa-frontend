import { CLIENT_ID } from "./constant";

const googleTools = {
    addGapiScriptToDOM: () => {
        let script = document.querySelector("#gapi-script");
        if (script) {
            document.body.removeChild(script);
        }

        script = document.createElement("script");
        script.src = "https://apis.google.com/js/api:client.js";
        script.id = "gapi-script";
        document.body.appendChild(script);
        return script;
    },

    initialGapiAuth2: (clientId) => {
        return window.gapi.auth2.init({
            client_id: clientId,
            cookiepolicy: "single_host_origin",
            scope: "profile email",
            access_type: "offline",
        });
    },

    insetGoogleAPIScript(buttonId, onSignIn, onFailure) {
        const script = this.addGapiScriptToDOM();
        script.addEventListener("load", () => {
            window.gapi.load("auth2", () => {
                const button = document.getElementById(buttonId);
                const auth2 = this.initialGapiAuth2(CLIENT_ID);
                auth2.attachClickHandler(button, {}, onSignIn, onFailure);
            });
        });
    }
}

export default googleTools;
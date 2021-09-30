

var startApp = function () {
    gapi.load("auth2", function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: "69016056321-5j2fr23vo8oggc3jsqksgu2a4g1s1mhn.apps.googleusercontent.com",
            cookiepolicy: "single_host_origin",
            scope: "profile email",
            access_type: "offline"
        });
        attachSignin(document.getElementById("my-signin2"));
    });
};

function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {}, onSignIn, onFailure);
}

function onSignIn(googleUser) {
    console.log(googleUser);
    var id_token = googleUser.getAuthResponse().id_token;
    var api = "http://localhost:8080/las/login";
    var option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: id_token
        })
    }
    fetch(api, option)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log(error));
}

function onFailure(error) {
    console.log(error);
}

const storageTools = {
    saveToken: (accessToken) => {
        if (accessToken) {
            localStorage.setItem("access_token", JSON.stringify(accessToken || ""));
        }

        console.log("Token saved: " + localStorage.getItem("access_token"));
    },

    getAccessToken: () => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            return JSON.parse(accessToken);
        }
    },

    removeAccessToken: () => {
        localStorage.removeItem("access_token");
    }
}

export default storageTools;
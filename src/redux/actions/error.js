
export const createNetworkError = () => {
    return {
        pathname: "/error",
        state: {
            message: "It’s not you. It’s us. Our server is down, but we’ll have things back to normal soon."
        }
    }
}

export const createUnknownError = (error) => {
    return {
        pathname: "/error",
        state: {
            pathname: "/error",
            state: {
                message: "Unknown error has occur, sorry about that. Please contact us for more information. " + error
            }
        }
    }
}
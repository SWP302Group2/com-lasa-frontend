
export const newUserInfo = (userInfo) => {
    return {
        type: "NEW_USER_INFO",
        payload: userInfo
    }
}

export const updateUserInfo = (userInfo) => {
    return {
        type: "UPDATE_USER_INFO",
        payload: userInfo
    }
}

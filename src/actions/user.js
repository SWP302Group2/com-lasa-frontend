
export const newUserInfo = (userInfo) => {
    return {
        type: "NEW_USER_INFO",
        payload: userInfo
    }
}

export const updateUserInfo = (updateInfo) => {
    return {
        type: "NEW_USER_INFO",
        payload: updateInfo
    }
}

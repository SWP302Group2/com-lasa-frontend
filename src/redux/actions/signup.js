
export const newSignUpInfo = (signUpInfo) => {
    return {
        type: "NEW_SIGNUP_INFO",
        payload: signUpInfo
    }
}

export const updateSignUpInfo = (signUpInfo) => {
    return {
        type: "UPDATE_SIGNUP_INFO",
        payload: signUpInfo
    }
}

export const updateProcessPosition = (position) => {
    return {
        type: "UPDATE_SIGNUP_INFO",
        payload: {
            processPosition: position
        }
    }
}

export const updateNameToSignupInfo = (name) => {
    return {
        type: "UPDATE_SIGNUP_INFO",
        payload: {
            userInfo: {
                name: name
            }
        }
    }
}

export const updateMSSVToSignupInfo = (mssv) => {
    return {
        type: "UPDATE_SIGNUP_INFO",
        payload: {
            userInfo: {
                mssv: mssv
            }
        }
    }
}

export const updateVerificationStatus = (status) => {
    return {
        type: "UPDATE_SIGNUP_INFO",
        payload: {
            verifyStatus: status
        }
    }
}

export const updateMeetUrlToSignupInfo = (meetUrl) => {
    return {
        type: "UPDATE_SIGNUP_INFO",
        payload: {
            userInfo: {
                meetUrl: meetUrl
            }
        }
    }
}
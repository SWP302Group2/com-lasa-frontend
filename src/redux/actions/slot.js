

export const newSlot = (slotInfo) => {
    return {
        type: "NEW_SLOT",
        payload: {
            ...slotInfo
        }
    }
}

export const updateTopicsToSlot = (selectedTopics) => {
    return {
        type: "UPDATE_SLOT",
        payload: {
            selectedTopics
        }
    }
}

export const updateInvalidMessagesToSlot = (invalidMessages) => {
    return {
        type: "UPDATE_SLOT",
        payload: {
            invalidMessages: {
                ...invalidMessages
            }
        }
    }
}

export const updateTimeStartToSlot = (timeStart) => {
    return {
        type: "UPDATE_SLOT",
        payload: {
            timeStart
        }
    }
}

export const updateTimeEndToSlot = (timeEnd) => {
    return {
        type: "UPDATE_SLOT",
        payload: {
            timeEnd
        }
    }
}

export const updatePeriodToSlot = (period) => {
    return {
        type: "UPDATE_SLOT",
        payload: {
            period
        }
    }
}
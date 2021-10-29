

export const newBookingRequest = (bookingInfo) => {
    return {
        type: "NEW_BOOKING_REQUEST",
        payload: {
            ...bookingInfo
        }
    }
}

export const updateQuestionsToBookingRequest = (questions) => {
    return {
        type: "UPDATE_BOOKING_REQUEST",
        payload: {
            questions: questions
        }
    }
}

export const updateTopicIdToBookingRequest = (topicId) => {
    return {
        type: "UPDATE_BOOKING_REQUEST",
        payload: {
            topicId: topicId
        }
    }
}

export const updateSlotToBookingRequest = (slot) => {
    return {
        type: "UPDATE_BOOKING_REQUEST",
        payload: {
            slot: slot
        }
    }
}

export const updateTitleToBookingRequest = (title) => {
    return {
        type: "UPDATE_BOOKING_REQUEST",
        payload: {
            title: title
        }
    }
}

export const updateInvalidMessageToBookingRequest = (message) => {
    return {
        type: "UPDATE_BOOKING_REQUEST",
        payload: {
            ...message
        }
    }
}

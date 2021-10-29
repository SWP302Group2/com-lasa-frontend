


export const newSearchCriteria = (props) => {
    return {
        type: "NEW_SEARCH_CRITERIA",
        payload: {
            ...props || null,
        }
    }
}

export const updateSearchValueToSearchCriteria = (searchValue) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            searchValue: searchValue || ""
        }
    }
}


export const updateLecturersToSearchCriteria = (lecturers) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            lecturers: lecturers
        }
    }
}

export const updateTopicsToSearchCriteria = (topics) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            topics: topics
        }
    }
}

export const updateUUIDToSearchCriteria = (uuid) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            uuid
        }
    }
}

export const updateNumberOfDateToSearchCriteria = (days) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            days
        }
    }
}
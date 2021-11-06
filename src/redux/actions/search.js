


export const newSearchCriteria = (props) => {
    return {
        type: "NEW_SEARCH_CRITERIA",
        payload: {
            ...props || null,
        }
    }
}


export const updateSearchBarValueToSearchCriteria = (value) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            searchBarValue: value || ""
        }
    }
}


export const updateSearchLecturerValueToSearchCriteria = (value) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            searchLecturerValue: value || ""
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

export const updateTimeToSearchCriteria = (time) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            time
        }
    }
}

export const updateSortByToSearchCriteria = (sortBy) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            sortBy
        }
    }
}

export const updateOrderByToSearchCriteria = (orderBy) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            orderBy
        }
    }
}


export const updateSearchValueToSearchCriteria = (searchValue) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            searchValue: searchValue
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

export const updateQuantityToSearchCriteria = (quantity) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            quantity: quantity
        }
    }
}

export const updateUnitToSearchCriteria = (unit) => {
    return {
        type: "UPDATE_SEARCH_CRITERIA",
        payload: {
            unit: unit
        }
    }
}
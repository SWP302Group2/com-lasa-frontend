

const algorithm = {
    getMatchedListBySearchValue: (array, searchValue, propName) => {
        return [...array].filter(item => {
            if (!item[propName]) return false;
            const nmlItemProp = item[propName].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const nmlSearchValue = searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

            if (nmlItemProp.includes(nmlSearchValue)) return true;
            if (nmlSearchValue.includes(nmlItemProp)) return true;
            return false;
        });
    },

    getMatchedListBySearchValueWithDeepAnalysis: (array, searchValue, propName) => {
        return [...array].filter(item => {
            if (!item[propName]) return false;
            const nmlItemProp = item[propName].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const nmlSearchValue = searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const wordsOfSearchValue = nmlSearchValue.split(" ");

            if (nmlItemProp.includes(nmlSearchValue)) return true;
            if (nmlSearchValue.includes(nmlItemProp)) return true;
            if (wordsOfSearchValue.find(word => nmlItemProp.includes(word))) return true;
            return false;
        });
    },



}

export default algorithm;
const algorithm = {
  getMatchedListBySearchValue: (array, searchValue, propName) => {
    if (searchValue?.length <= 0) return [];
    if (!Array.isArray(array) || array.length <= 0) return [];
    const words = searchValue.split(/\s+/);

    return [...array].filter((item) => {
      if (!item[propName]) return false;
      const nmlItemProp = item[propName]
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const nmlSearchValue = searchValue
        ?.trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      if (nmlItemProp.includes(nmlSearchValue)) return true;
      if (nmlSearchValue.includes(nmlItemProp)) return true;
      if (
        words.find((word) => {
          const nmlWord = word
            ?.trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

          if (nmlWord.includes(nmlItemProp)) return true;
          if (nmlItemProp.includes(nmlWord)) return true;
          return false;
        })
      ) {
        return true;
      }

      return false;
    });
  },

  getMatchedListBySearchValueWithDeepAnalysis: (
    array,
    searchValue,
    propName
  ) => {
    return [...array].filter((item) => {
      if (!item[propName]) return false;
      const nmlItemProp = item[propName]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const nmlSearchValue = searchValue
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const wordsOfSearchValue = nmlSearchValue.split(" ");

      if (nmlItemProp.includes(nmlSearchValue)) return true;
      if (nmlSearchValue.includes(nmlItemProp)) return true;
      if (wordsOfSearchValue.find((word) => nmlItemProp.includes(word)))
        return true;
      return false;
    });
  },
};

export default algorithm;

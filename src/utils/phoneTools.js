const phoneTools = {
  displayPhone: (phone) => {
    if (phone == null || typeof phone !== "string") return "";
    const regex = new RegExp(
      /(\d{2})(\d{3})(\d{3})(\d{3})?(\d{1,3})?(\d{1,3})?(\d{1,3})?(\d{1,3})?/
    );
    const match = phone.match(regex);
    if (match) {
      return `+${match[1]} ${match[2] ? `${match[2]}` : ""}${
        match[3] ? `-${match[3]}` : ""
      }${match[4] ? `-${match[4]}` : ""}${match[5] ? `-${match[5]}` : ""}${
        match[6] ? `-${match[6]}` : ""
      }`;
    }
    return "";
  },
};

export default phoneTools;

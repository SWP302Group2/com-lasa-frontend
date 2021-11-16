const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dayOfWeek = [
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const dateTools = {
  getTimeStartAndTimeEndInISOFormat: (time) => {
    const now = new Date();
    const timeStart = dateTools.convertDateToISOStringWithTimeZoneOffset(now);
    now.setTime(now.getTime() + time.getValue() * 60 * 60 * 1000);
    console.log(time.getValue());
    console.log(now);
    const timeEnd = dateTools.convertDateToISOStringWithTimeZoneOffset(now);

    return {
      timeStart,
      timeEnd,
    };
  },

  getISODatetimeOfNow: () => {
    return dateTools.convertDateToISOStringWithTimeZoneOffset(new Date());
  },

  convertISOStringDateTimeWithTimeZoneOffset: (ISOString) => {
    var tzoffset = new Date().getTimezoneOffset();
    const date = new Date(ISOString);
    return new Date(date.getTime() - tzoffset * 60000)
      .toISOString()
      .split(".")[0];
  },

  convertDateToISOStringWithTimeZoneOffset: (date) => {
    if (!date) return null;
    console.log(date);
    var tzoffset = new Date().getTimezoneOffset();
    return new Date(date.getTime() - tzoffset * 60000)
      .toISOString()
      .split(".")[0];
  },

  convertISOStringToDateWithTimeZoneOffset: (ISOString) => {
    var tzoffset = new Date().getTimezoneOffset();
    const date = new Date(ISOString);
    return new Date(date.getTime() - tzoffset * 60000);
  },

  convertLocalDateTimeStringToObject: (localDateTime) => {
    const date = new Date(localDateTime);
    return {
      year: { value: date.getFullYear() },
      month: {
        name: months[date.getMonth()],
        value: date.getMonth(),
      },
      date: {
        name: dayOfWeek[date.getDay() - 1],
        value: date.getDate(),
      },
      hours: {
        value: date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
      },
      minutes: {
        value: (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(),
      },
      seconds: {
        value: (date.getSeconds() < 10 ? "0" : "") + date.getSeconds(),
      },
      when: {
        value: date.getHours() <= 12 ? "am" : "pm",
      },
      getDateString: () => {
        return `${dayOfWeek[date.getDay() - 1]}, ${date.getDate()}/${
          date.getMonth() + 1
        }`;
      },
      getTimeString: () => {
        return `${
          date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
        } : ${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}`;
      },
      getOriginalDate: () => {
        return localDateTime;
      },
      getNormalDateString: () => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
    };
  },
};

export default dateTools;

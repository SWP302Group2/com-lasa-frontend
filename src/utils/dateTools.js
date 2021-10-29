
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
const dayOfWeek = ["Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const dateTools = {
    getTimeStartAndTimeEndInISOFormat: (days) => {
        const now = new Date();
        const timeStart = dateTools.convertDateToISOStringWithTimeZoneOffset(now);
        now.setDate(now.getDate() + days);
        const timeEnd = dateTools.convertDateToISOStringWithTimeZoneOffset(now);

        return {
            timeStart,
            timeEnd
        }
    },

    getISODatetimeOfNow: () => {
        return dateTools.convertDateToISOStringWithTimeZoneOffset(new Date());
    },

    convertISOStringDateTimeWithTimeZoneOffset: (ISOString) => {
        var tzoffset = (new Date()).getTimezoneOffset();
        const date = new Date(ISOString);
        return new Date(date.getTime() - tzoffset * 60000).toISOString().split(".")[0];
    },

    convertDateToISOStringWithTimeZoneOffset: (date) => {
        var tzoffset = new Date().getTimezoneOffset();
        return new Date(date.getTime() - tzoffset * 60000).toISOString().split(".")[0];
    },

    convertISOStringToDateWithTimeZoneOffset: (ISOString) => {
        var tzoffset = new Date().getTimezoneOffset();
        const date = new Date(ISOString);
        return new Date(date.getTime() - tzoffset * 60000);
    },

    convertLocalDateTimeStringToObject: (localDateTime) => {
        // const date = dateTools.convertISOStringToDateWithTimeZoneOffset(localDateTime);
        const date = new Date(localDateTime);
        return {
            year: { value: date.getFullYear() },
            month: {
                name: months[date.getMonth()],
                value: date.getMonth()
            },
            date: {
                name: dayOfWeek[date.getDay()],
                value: date.getDate()
            },
            hours: {
                value: date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
            },
            minutes: {
                value: (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
            },
            seconds: {
                value: (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()
            },
            when: {
                value: date.getHours() <= 12 ? "am" : "pm"
            },
            getDateString: () => {
                return `${dayOfWeek[date.getDay()]}, ${date.getDate()}/${date.getMonth() + 1}`;
            },
            getTimeString: () => {
                return `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()} ${date.getHours() <= 12 ? "am" : "pm"}`;
            },
            getOriginalDate: () => {
                return localDateTime;
            }
        }
    }
}

export default dateTools;
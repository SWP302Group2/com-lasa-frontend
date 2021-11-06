
function calculateAboutTimeDiffer(dateNow, dateFuture, type) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow);

    type = type.toLowerCase();
    switch (type) {
        case "hour": {
            return Math.floor(diffInMilliSeconds / (1000 * 60 * 60));
        }
        case "day": {
            return Math.floor(diffInMilliSeconds / (1000 * 60 * 60 * 24));
        }
        case "minute": {
            return Math.floor(diffInMilliSeconds / (1000));
        }
        case "second": {
            return Math.floor(diffInMilliSeconds / (1000));
        }
        default:
            return diffInMilliSeconds;
    }
}

export const timeList = [
    {
        id: 1,
        name: "All days",
        getValue: () => null
    },
    {
        id: 2,
        name: "Today",
        getValue: () => 24 - (new Date()).getHours()
    },
    {
        id: 3,
        name: "This week",
        getValue: () => {
            const today = new Date();
            const lastdayOfThisWeek = new Date();
            lastdayOfThisWeek.setDate(today.getDate() - (today.getDay() - 1) + 6);
            return calculateAboutTimeDiffer(today, lastdayOfThisWeek, "hour");
        }
    },
    {
        id: 4,
        name: "This month",
        getValue: () => {
            const today = new Date();
            const lastdayOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            return calculateAboutTimeDiffer(today, lastdayOfThisMonth, "hour");
        }
    },
    {
        id: 5,
        name: "This year",
        getValue: () => {
            const today = new Date();
            const lastdayOfThisYear = new Date(today.getFullYear(), 11, 31);
            return calculateAboutTimeDiffer(today, lastdayOfThisYear, "hour");
        }
    }
]
var Holidays = require('date-holidays');
var hd = new Holidays('FR');
var days_off = hd.getHolidays((new Date().getFullYear())).map(x => new Date(x.date));

function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function isWeekEnd(day) {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    if (weekday[day.getDay()] == "Saturday" || weekday[day.getDay()] == "Sunday") {
        return true;
    } else {
        return false;
    }
}

function isDayOff(day) {
    for (var jour in days_off) {
        if (days_off[jour].getTime() == day.getTime()) {
            return true;
        }
    }
    return false;

}

function business_days(month, year) {
    var days_month = getDaysInMonth(month, year);
    var business_days = []
    for (var day in days_month) {
        if (!isWeekEnd(days_month[day]) && !isDayOff(days_month[day])) {
            business_days.push(days_month[day])
        }
    }

    return business_days;
}

exports.business_days = business_days
exports.isDayOff = isDayOff
exports.isWeekEnd = isWeekEnd
exports.days_off = days_off
exports.getDaysInMonth = getDaysInMonth
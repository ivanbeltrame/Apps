const americanStandards = false;

// Helper functions
function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

// Get today's data
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const currentDate = now.getDate();
const currentDay = now.getDay();
let currentWeekDay = currentDay;
// getDay() uses american week standard: sunday is first ... saturday is last
if (currentWeekDay == 0 && !americanStandards) currentWeekDay = 7;

// HTML progress bars
const yearProgress = document.getElementById("yearProgress");
const monthProgress = document.getElementById("monthProgress");
const weekProgress = document.getElementById("weekProgress");
const dayProgress = document.getElementById("dayProgress");

// Calculate year percentile
let start = new Date(now.getFullYear(), 0, 0);
let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
let oneDay = 1000 * 60 * 60 * 24;
let days = Math.floor(diff / oneDay);

let yearPercentile = leapYear(currentYear) ? days / 366 : days / 365;
yearPercentile = Math.round(yearPercentile * 100);

// Set year progress bar
yearProgress.setAttribute("aria-valuenow", yearPercentile);
yearProgress.children[0].innerHTML = yearPercentile + "%";
yearProgress.children[0].style.width = yearPercentile + "%";

// Calculate month percentile
let daysMonth = daysInMonth(currentMonth, currentYear);
let monthPercentile = Math.round(currentDate / daysMonth * 100);

// Set month progress bar
monthProgress.setAttribute("aria-valuenow", monthPercentile);
monthProgress.children[0].innerHTML = monthPercentile + "%";
monthProgress.children[0].style.width = monthPercentile + "%";

// Calculate week percentile
let weekPercentile = Math.round(currentWeekDay / 7 * 100);

// Set week progress bar
weekProgress.setAttribute("aria-valuenow", weekPercentile);
weekProgress.children[0].innerHTML = weekPercentile + "%";
weekProgress.children[0].style.width = weekPercentile + "%";

// Real time clock
const realTimeClock = document.getElementById("realTime");

let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][currentMonth - 1];
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentDay];
let date = now.getDate();

(function(){
    let now = new Date();

    let hours = now.getHours();
    if (hours < 10) hours = "0" + hours;
    let minutes = now.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = now.getSeconds();
    if (seconds < 10) seconds = "0" + seconds;

    let formattedTime = hours + ":" + minutes + ":" + seconds + " " + day + ", " + month + " " + date + ", " + currentYear;

    realTimeClock.innerHTML = formattedTime;

    // Calculate day percentile
    let todaySeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const secondsInADay = 86400; // 60 seconds * 60 minutes * 24 hours
    let dayPercentile = Math.round(todaySeconds / secondsInADay * 100);

    // Set today progress bar
    dayProgress.setAttribute("aria-valuenow", dayPercentile);
    dayProgress.children[0].innerHTML = dayPercentile + "%";
    dayProgress.children[0].style.width = dayPercentile + "%";

    setTimeout(arguments.callee, 1000);
})();
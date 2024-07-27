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
const currentDay = now.getDate();
let currentWeekDay = now.getDay();
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
let day = Math.floor(diff / oneDay);

let yearPercentile = leapYear(currentYear) ? day / 366 : day / 365;
yearPercentile = Math.round(yearPercentile * 100);

// Set year progress bar
yearProgress.setAttribute("aria-valuenow", yearPercentile);
yearProgress.children[0].innerHTML = yearPercentile + "%";
yearProgress.children[0].style.width = yearPercentile + "%";

// Calculate month percentile
let daysMonth = daysInMonth(currentMonth, currentYear);
let monthPercentile = Math.round(currentDay / daysMonth * 100);

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

// Calculate day percentile
let todaySeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
const secondsInADay = 86400; // 60 seconds * 60 minutes * 24 hours
let dayPercentile = Math.round(todaySeconds / secondsInADay * 100);

// Set today progress bar
dayProgress.setAttribute("aria-valuenow", dayPercentile);
dayProgress.children[0].innerHTML = dayPercentile + "%";
dayProgress.children[0].style.width = dayPercentile + "%";
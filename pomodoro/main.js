let timer;
let timerType = "pomodoro"; // Starting position
let iteration = 1;
let timerSpan = document.getElementById("timer");
let pomodoroTimerSetting = document.getElementById("pomodoroDuration");
let shortTimerSetting = document.getElementById("shortDuration");
let longTimerSetting = document.getElementById("longDuration");
let longIntervalSetting = document.getElementById("longInterval");

// Default settings
let pomodoroTime = 60 * 25;
let shortTime = 60 * 5;
let longTime = 60 * 15;
let longBreakIterations = 4;

function startTimer() {
    function updateTimer() {
        timerSpan.innerHTML = formatSeconds(seconds);
        if (seconds == 0) {
            if (timerType == "pomodoro") {
                if (iteration != longBreakIterations) {
                    updateTimerType("short");
                } else {
                    updateTimerType("long");
                    iteration = 0;
                }
            } else {
                updateTimerType("pomodoro");
                iteration += 1;
            }
        }
        seconds -= 1;
    }
    let seconds;
    if (timerType == "pomodoro") { seconds = pomodoroTime }
    else if (timerType == "short") { seconds = shortTime }
    else seconds = longTime;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function updateTimerType(type) {
    timerType = type;
    clearInterval(timer);
    
    document.getElementById(type).checked = true;
    if (timerType == "pomodoro") timerSpan.innerHTML = formatSeconds(pomodoroTime);
    else if (timerType == "short") timerSpan.innerHTML = formatSeconds(shortTime);
    else timerSpan.innerHTML = formatSeconds(longTime);
}

function updateSettings() {
    pomodoroTime = pomodoroTimerSetting.value * 60;
    shortTime = shortTimerSetting.value * 60;
    longTime = longTimerSetting.value * 60;
    longBreakIterations = longIntervalSetting.value;

    // localStorage.setItem("pomodoroTime", pomodoroTime / 60);
    // localStorage.setItem("shortTime", shortTime / 60);
    // localStorage.setItem("longTime", longTime / 60);
    // localStorage.setItem("longBreakIterations", longBreakIterations);

    if (timerType == "pomodoro") timerSpan.innerHTML = formatSeconds(pomodoroTime);
    else if (timerType == "short") timerSpan.innerHTML = formatSeconds(shortTime);
    else timerSpan.innerHTML = formatSeconds(longTime);
}

function formatSeconds(total) {
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

document.querySelectorAll('input[name="timerType"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateTimerType(radio.value);
    });
});

// let lsPomodoroTime = localStorage.getItem("pomodoroTime");
// if (lsPomodoroTime) pomodoroTime = lsPomodoroTime * 60;
// let lsShortTime = localStorage.getItem("shortTime");
// if (lsShortTime) pomodoroTime = lsShortTime * 60;
// let lsLongTime = localStorage.getItem("longTime");
// if (lsLongTime) pomodoroTime = lsLongTime * 60;
// let lsLongIterationsTime = localStorage.getItem("longBreakIterations");
// if (lsLongIterationsTime) pomodoroTime = lsLongIterationsTime;
// updateSettings();

// Reset modal settings -> after refreshing the page
pomodoroTimerSetting.value = pomodoroTime / 60;
shortTimerSetting.value = shortTime / 60;
longTimerSetting.value = longTime / 60;
longIntervalSetting.value = longBreakIterations;
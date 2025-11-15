let timer;
let timerType = "pomodoro";
let iteration = 1;
let timerSpan = document.getElementById("timer");
// let pomodoroTime = 60 * 25;
let pomodoroTime = 4;
// let shortBreakTime = 60 * 5;
let shortBreakTime = 4;
// let longBreakTime = 60 * 15;
let longBreakTime = 4;

function startTimer() {
    function updateTimer() {
        // console.log(seconds);
        timerSpan.innerHTML = formatSeconds(seconds);
        if (seconds == 0) {
            if (timerType == "pomodoro") {
                if (iteration != 4) {
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
    else if (timerType == "short") { seconds = shortBreakTime }
    else seconds = longBreakTime;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function updateTimerType(type) {
    timerType = type;
    clearInterval(timer);
    
    document.getElementById(type).checked = true;
    if (timerType == "pomodoro") timerSpan.innerHTML = formatSeconds(pomodoroTime);
    else if (timerType == "short") timerSpan.innerHTML = formatSeconds(shortBreakTime);
    else timerSpan.innerHTML = formatSeconds(longBreakTime);
}

function formatSeconds(total) {
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

document.querySelectorAll('input[name="timerType"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateTimerType(radio.value);
        console.log("changed")
    });
});
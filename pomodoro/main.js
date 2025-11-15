// let inter = setInterval(() => {
//     console.log("ciao");
// }, 1000);

// setTimeout(() => {
//     clearInterval(inter);
// }, 5000);

let timer;
let timerType = "pomodoro";
let timerSpan = document.getElementById("timer");
let pomodoroTime = 60 * 25;
// let pomodoroTime = 6;
let shortBreakTime = 60 * 5;
let longBreakTime = 60 * 15;

function startTimer() {
    function updateTimer() {
        // console.log(seconds);
        timerSpan.innerHTML = formatSeconds(seconds);
        seconds -= 1;
        if (seconds == 0) {
            clearInterval(timer);
        }
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
    
    if (timerType == "pomodoro") { timerSpan.innerHTML = formatSeconds(pomodoroTime) }
    else if (timerType == "short") { timerSpan.innerHTML = formatSeconds(shortBreakTime) }
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
    });
});
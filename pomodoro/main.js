// let inter = setInterval(() => {
//     console.log("ciao");
// }, 1000);

// setTimeout(() => {
//     clearInterval(inter);
// }, 5000);

let timer;
let timerSpan = document.getElementById("timer");
let pomodoroTime = 60 * 25;
// let pomodoroTime = 6;
let shortBreakTime = 60 * 5;
let longBreakTime = 60 * 15;

function startTimer() {
    function updateTimer() {
        console.log(seconds);
        timerSpan.innerHTML = formatSeconds(seconds);
        seconds -= 1;
        if (seconds == 0) {
            clearInterval(timer);
        }
    }
    let seconds = pomodoroTime;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function formatSeconds(total) {
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

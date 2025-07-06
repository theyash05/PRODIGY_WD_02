let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

function updateDisplay() {
    let time = elapsedTime;
    if (running) {
        time += Date.now() - startTime;
    }
    const ms = Math.floor((time % 1000) / 10);
    const s = Math.floor((time / 1000) % 60);
    const m = Math.floor((time / 60000) % 60);
    display.textContent = 
        `${m.toString().padStart(2, '0')}:` +
        `${s.toString().padStart(2, '0')}:` +
        `${ms.toString().padStart(2, '0')}`;
}

function start() {
    if (!running) {
        running = true;
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
    }
}

function pause() {
    if (running) {
        running = false;
        elapsedTime += Date.now() - startTime;
        clearInterval(timerInterval);
        updateDisplay();
    }
}

function reset() {
    running = false;
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = "";
}

function lap() {
    if (running) {
        let time = elapsedTime + (Date.now() - startTime);
        const ms = Math.floor((time % 1000) / 10);
        const s = Math.floor((time / 1000) % 60);
        const m = Math.floor((time / 60000) % 60);
        const lapTime = 
            `${m.toString().padStart(2, '0')}:` +
            `${s.toString().padStart(2, '0')}:` +
            `${ms.toString().padStart(2, '0')}`;
        const lapDiv = document.createElement('div');
        lapDiv.textContent = lapTime;
        laps.appendChild(lapDiv);
    }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

updateDisplay();
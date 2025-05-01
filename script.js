const minutesLabel= document.querySelector("#minutes");
const secondsLabel= document.querySelector("#seconds");
const millisecondsLabel= document.querySelector("#milliseconds");

const startButton = document.querySelector("#startBtn");
const stopButton = document.querySelector("#stopBtn");
const pauseButton = document.querySelector("#pauseBtn");
const resetButton = document.querySelector("#resetBtn");

const lapList=document.querySelector("#laplist");

// Variable for Stopwatch timer 
let minutes=0;
let seconds=0;
let milliseconds=0;
let interval;

// eventListener on buttons
startButton.addEventListener("click",startTimer);
stopButton.addEventListener("click",stopTimer);
pauseButton.addEventListener("click",pauseTimer);
resetButton.addEventListener("click",resetTimer);


function startTimer() {
    interval=setInterval(updateTimer,10)
    startButton.disabled=true;
    pauseButton.disabled=false;
}


function stopTimer() {
    clearInterval(interval);
    addLapList();
    resetTimerData();
    startButton.disabled=false;    
}


function pauseTimer() {
    clearInterval(interval);
    startButton.disabled=false;
}


function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    startButton.disabled=false;
}

function updateTimer() {
    milliseconds++;
    if(milliseconds===100){
        milliseconds=0;
        seconds++;
        if (seconds===60) {
            seconds=0;
            minutes++
        }
    }
    displayTimer();
}


function displayTimer() {
    millisecondsLabel.textContent= padTime(milliseconds);
    secondsLabel.textContent= padTime(seconds);
    minutesLabel.textContent= padTime(minutes);

}

function padTime(time) {
    return time.toString().padStart(2,"0")
}

function resetTimerData() {
    milliseconds=0;
    seconds=0;
    minutes=0;
    displayTimer();
}

function addLapList() {
    const lapTime=`${padTime(minutes)} : ${padTime(seconds)} : ${padTime(milliseconds)}`
    const listContainer=document.createElement("li")
    listContainer.innerHTML=`<span>Lap ${lapList.childElementCount+1} :</span> ${lapTime}`
    lapList.appendChild(listContainer);
}
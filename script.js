// JavaScript code

// Array to store active timers
const activeTimers = [];

// Function to create a new timer
function createTimer(hours, minutes, seconds) {
    const totalTime = hours * 3600 + minutes * 60 + seconds;
    let timeRemaining = totalTime;

    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    timerElement.innerText = formatTime(timeRemaining);

    const stopButton = document.createElement('button');
    stopButton.innerText = 'Stop Timer';
    stopButton.addEventListener('click', () => {
        clearInterval(interval);
        timerElement.remove();
    });

    const interval = setInterval(() => {
        timeRemaining--;
        timerElement.innerText = formatTime(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(interval);
            timerComplete(timerElement);
        }
    }, 1000);

    timerElement.appendChild(stopButton);
    document.querySelector('.active-timers').appendChild(timerElement);
}

// Function to format time as HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Function to handle timer completion
function timerComplete(timerElement) {
    timerElement.classList.add('complete');
    const audio = document.getElementById('audio');
    audio.play();
}

// Event listener for the 'Start New Timer' button
document.getElementById('startTimer').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time.');
        return;
    }

    createTimer(hours, minutes, seconds);
});

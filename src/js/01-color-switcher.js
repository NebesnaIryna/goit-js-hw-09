const COLOR_DELAY = 1000;

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timeoutId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick () {
    btnStart.disabled = true;
    btnStop.disabled = false;

    timeoutId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
      }, COLOR_DELAY);
};

function onBtnStopClick () {
    clearInterval(timeoutId);

    btnStart.disabled = false;
    btnStop.disabled = true;
};

const BG_CHANGE_FREQUENCY = 1000;
let timerId = null;

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
stopBtn.setAttribute('disabled', '');

function onStartBtnClick() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, BG_CHANGE_FREQUENCY);

  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled', '');
}

function onStopBtnClick() {
  clearInterval(timerId);

  startBtn.removeAttribute('disabled', '');
  stopBtn.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

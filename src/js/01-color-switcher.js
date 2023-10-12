const selectors = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
selectors.startBtn.addEventListener('click', handlerStartBtn);
selectors.stopBtn.addEventListener('click', handlerStopBtn);

let intervalId = null;

let startBtnActive = false;

selectors.stopBtn.disabled = true;

function handlerStartBtn(evt) {
  intervalId = setInterval(backgroundColorChange, 1000);
  selectors.stopBtn.disabled = false;

  if (startBtnActive) {
    selectors.startBtn.disabled = true;
    selectors.startBtn.removeEventListener('click', handlerStartBtn);
  }
}

function handlerStopBtn(evt) {
  clearInterval(intervalId);
  selectors.startBtn.disabled = false;
  selectors.startBtn.addEventListener('click', handlerStartBtn);
  selectors.stopBtn.disabled = true;
}

function backgroundColorChange() {
  document.body.style.background = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

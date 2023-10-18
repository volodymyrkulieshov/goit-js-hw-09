// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const selectors = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
};

selectors.startBtn.addEventListener('click', handlerClickBtn);

selectors.startBtn.disabled = true;
let dates = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      selectors.startBtn.disabled = false;
      dates = selectedDates[0];
    }
  },
};
flatpickr(selectors.input, options);

let intervalId = 0;

function handlerClickBtn(evt) {
    intervalId = setInterval((_) => { createTimer() }, 1000);
    selectors.startBtn.disabled = true;
    selectors.input.disabled = true;
}

function createTimer() {
    
    const choosenDate = new Date(selectors.input.value);
    const finishTime = choosenDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(finishTime);

    selectors.day.textContent = addLeadingZero(days);
    selectors.hour.textContent = addLeadingZero(hours);
    selectors.minute.textContent = addLeadingZero(minutes);
    selectors.second.textContent = addLeadingZero(seconds);

    if (finishTime < 1000) {
        clearInterval(intervalId);
        selectors.input.disabled = false;
    }

    function addLeadingZero(value) {
        return `${value}`.padStart(2,'0')
     }

    function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
    }

    // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
    // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
    // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

}

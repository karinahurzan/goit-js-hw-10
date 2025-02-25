'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(input, options);

startButton.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

let timerId;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const delayTime = userSelectedDate - currentTime;

    if (delayTime <= 0) {
      clearInterval(timerId);
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
      input.disabled = false;
      return;
    }

    const { daysNew, hoursNew, minutesNew, secondsNew } = convertMs(delayTime);

    days.textContent = addLeadingZero(daysNew);
    hours.textContent = addLeadingZero(hoursNew);
    minutes.textContent = addLeadingZero(minutesNew);
    seconds.textContent = addLeadingZero(secondsNew);
  }, 1000);
});

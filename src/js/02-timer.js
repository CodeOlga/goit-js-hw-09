import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
startBtn.style.color = 'red';
// startBtn.style.fontSize = '30px';
startBtn.addEventListener('click', onStartBtnClick);

const body = document.body;
body.style.backgroundColor = '#777777';
// const fields = document.querySelector('.timer');
// fields.style.color = 'red';

// const currentTime = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),

  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates);
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
    console.log(selectedDates[0]);
    // console.log(selectedDates);
  },
};

const fp = flatpickr('input#datetime-picker', options);
// console.log(fp);
//---------------------------------------------------------------
// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }
class CountDownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.daysSpan = document.querySelector(`${selector} [data-days]`);
    this.hoursSpan = document.querySelector(`${selector} [data-hours]`);
    this.minsSpan = document.querySelector(`${selector} [data-minutes]`);
    this.secsSpan = document.querySelector(`${selector} [data-seconds]`);
  }

  updateMarkup() {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const delta = this.targetDate - currentTime;

      // console.log(currentTime);
      // console.log(this.targetDate);
      // console.log(delta);
      const { days, hours, minutes, seconds } = this.convertMs(delta);
      this.daysSpan.textContent = days;
      this.hoursSpan.textContent = hours;
      this.minsSpan.textContent = minutes;
      this.secsSpan.textContent = seconds;
      if (delta === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
  // this.updateMarkup()
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    // const days = Math.floor(ms / day)
    //   .toString()
    //   .padStart(2, '0');
    // const hours = Math.floor((ms % day) / hour)
    //   .toString()
    //   .padStart(2, '0');
    // const minutes = Math.floor(((ms % day) % hour) / minute)
    //   .toString()
    //   .padStart(2, '0');
    // const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    //   .toString()
    //   .padStart(2, '0');

    return { days, hours, minutes, seconds };
  }
  //  addLeadingZero(value) {
  //   return String(value).padStart(2, '0');
  // }
}

// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }

const timer = new CountDownTimer({
  selector: '.timer',
  targetDate: fp.selectedDates[0].getTime(),
});

function onStartBtnClick() {
  timer.updateMarkup();
}
// startBtn.addEventListener('click', () => timer.updateMarkup());
// const bindFn = timer.updateMarkup.bind(timer);
// startBtn.addEventListener('click', bindFn);

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
startBtn.style.color = 'red';
startBtn.style.fontSize = '20px';
startBtn.style.borderRadius = '5px';
startBtn.style.width = '100px';
startBtn.addEventListener('click', onStartBtnClick);

const body = document.body;
body.style.backgroundColor = '#888888';

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
      timer.setTargetDate(selectedDates[0]);
    }
    console.log(selectedDates[0]);
  },
};

flatpickr('input#datetime-picker', options);
// const fp = flatpickr('input#datetime-picker', options);

class CountDownTimer {
  constructor({ selector }) {
    this.targetDate;
    this.daysSpan = document.querySelector(`${selector} [data-days]`);
    this.hoursSpan = document.querySelector(`${selector} [data-hours]`);
    this.minsSpan = document.querySelector(`${selector} [data-minutes]`);
    this.secsSpan = document.querySelector(`${selector} [data-seconds]`);
  }
  setTargetDate(targetDate) {
    this.targetDate = targetDate;
  }
  updateMarkup() {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const delta = this.targetDate - currentTime;
      const { days, hours, minutes, seconds } = this.convertMs(delta);

      this.daysSpan.textContent = this.addLeadingZero(days);
      this.hoursSpan.textContent = this.addLeadingZero(hours);
      this.minsSpan.textContent = this.addLeadingZero(minutes);
      this.secsSpan.textContent = this.addLeadingZero(seconds);

      //потрібно, щоб було < 1000ms
      if (delta < 1000) {
        clearInterval(intervalId);
      }
    }, 1000);
  }

  convertMs(ms) {
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
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountDownTimer({
  selector: '.timer',
  // targetDate: fp.selectedDates[0],
  // targetDate: fp.selectedDates[0].getTime(),
});

function onStartBtnClick() {
  timer.updateMarkup();
}
//працює і так
// startBtn.addEventListener('click', () => timer.updateMarkup());

//ментор пояснював
// const bindFn = timer.updateMarkup.bind(timer);
// startBtn.addEventListener('click', bindFn);

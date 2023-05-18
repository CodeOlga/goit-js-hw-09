import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', '');
// startBtn.addEventListener('click', updateMarkup());
let selectedDates = [];
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),

  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() > new Date(selectedDates)) {
      alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled', '');
    }
    console.log(selectedDates[0]);
  },
};

flatpickr('input#datetime-picker', options);

class CountDownTimer {
  constructor({ selector, selectedDates }) {
    this.selectedDates = selectedDates;
    this.daysSpan = document.querySelector(`${selector} [data-days]`);
    this.hoursSpan = document.querySelector(`${selector} [data-hours]`);
    this.minsSpan = document.querySelector(`${selector} [data-mins]`);
    this.secsSpan = document.querySelector(`${selector} [data-secs]`);
    // startBtn.addEventListener('click', this.updateMarkup());
    // this.updateMarkup();
  }

  updateMarkup() {
    setInterval(() => {
      const currentTime = Date.now();
      const delta = this.selectedDates - currentTime;

      const { days, hours, minutes, seconds } = this.convertMs(delta);
      this.daysSpan.textContent = days;
      this.hoursSpan.textContent = hours;
      this.minsSpan.textContent = minutes;
      this.secsSpan.textContent = seconds;
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
}

const timer = new CountDownTimer({
  selector: '.timer',
  selectedDates: new Date(selectedDates),
});
// startBtn.addEventListener('click', timer.updateMarkup());
// timer.updateMarkup();

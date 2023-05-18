import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', '');
// startBtn.addEventListener('click', timer.updateMarkup);
startBtn.style.color = 'red';

const body = document.body;
body.style.backgroundColor = '#777777';
// const fields = document.querySelector('.timer');
// fields.style.color = 'red';

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
    // console.log(selectedDates);
  },
};

flatpickr('input#datetime-picker', options);

//---------------------------------------------------------------
class CountDownTimer {
  constructor({ selector, selectedDates }) {
    this.selectedDates = selectedDates;
    this.daysSpan = document.querySelector(`${selector} [data-days]`);
    this.hoursSpan = document.querySelector(`${selector} [data-hours]`);
    this.minsSpan = document.querySelector(`${selector} [data-minutes]`);
    this.secsSpan = document.querySelector(`${selector} [data-seconds]`);
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

    // addLeadingZero(value) {}

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
}

const timer = new CountDownTimer({
  selector: '.timer',
  selectedDates: selectedDates.toString(),
  // selectedDates: new Date(selectedDates).toString(),
  // selectedDates: new Date(selectedDates.toString()),
  // selectedDates: new Date(selectedDates[0]).toString(),
  // selectedDates: new Date(selectedDates[0]),
});
startBtn.addEventListener('click', timer.updateMarkup);
// timer.updateMarkup();

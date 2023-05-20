import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

//отримуємо доступ до кнопки, змінюємо стилі, робимо кнопку неактивною
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
startBtn.style.color = 'red';
startBtn.style.fontSize = '20px';
startBtn.style.borderRadius = '5px';
startBtn.style.width = '100px';
startBtn.addEventListener('click', onStartBtnClick);

//стилі body
const body = document.body;
body.style.backgroundImage =
  'url(https://images.unsplash.com/photo-1578923931302-7fd9b3495be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGltZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60)';
body.style.backgroundRepeat = 'no-repeat';
body.style.backgroundSize = 'cover';
body.style.backgroundPosition = 'center';
body.style.minHeight = '100vh';

//об'єкт налаштувань для функції бібліотеки "flatpickr"
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),

  minuteIncrement: 1,
  //цей метод спрацює після того, як користувач обрав дату і закрив календар
  onClose(selectedDates) {
    console.log(selectedDates);
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Success');
      //робимо кнопку активною
      //викликаємо тут метод setTargetDate і передаємо йому ту дату, що обрав користувач
      startBtn.disabled = false;
      timer.setTargetDate(selectedDates[0]);
    }
    console.log(selectedDates[0]);
  },
};

//робимо екземпляр бібліотеки (ініціалізація), в змінну fp потрібно записувати,
//якщо потрібно використовувати методи самої біблітеки (інтерфейс екземпляра)

//у fp.selectedDates[0] буде обрана користувачем дата
flatpickr('input#datetime-picker', options);
// const fp = flatpickr('input#datetime-picker', options);

//створення класу countDownTimer
class CountDownTimer {
  constructor({ selector }) {
    this.targetDate;
    this.daysSpan = document.querySelector(`${selector} [data-days]`);
    this.hoursSpan = document.querySelector(`${selector} [data-hours]`);
    this.minsSpan = document.querySelector(`${selector} [data-minutes]`);
    this.secsSpan = document.querySelector(`${selector} [data-seconds]`);
  }

  //метод класу, що приймає обрану дату з календаря та додає її у властивість targetDate
  setTargetDate(targetDate) {
    this.targetDate = targetDate;
  }

  //метод класу, що генерує розмітку таймера
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
      //delta ніколи не буде рівна 0 (завджи є похибка)
      //зупинка таймера, коли delta менше 1 секунди
      if (delta < 1000) {
        clearInterval(intervalId);
        Notiflix.Notify.success('Countdown finished!');
      }
    }, 1000);
  }

  //метод, що приймає значення в мілісекундах і повертає days, hours, minutes, seconds
  //'Адская копипаста со стека' (від індуса)
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

  //метод класу, що додає 0, якщо в числі менше двох символів (для форматування часу)
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

//ініціалізація таймера (створення еземплеру класу countDownTimer)
const timer = new CountDownTimer({
  selector: '.timer',
  //у fp.selectedDates[0] буде обрана користувачем дата
  // targetDate: fp.selectedDates[0],
  // targetDate: fp.selectedDates[0].getTime(),
});

//при кліку на кнопку викликаємо timer
function onStartBtnClick() {
  timer.updateMarkup();
}
//працює і так
// startBtn.addEventListener('click', () => timer.updateMarkup());

//ментор пояснював
// const bindFn = timer.updateMarkup.bind(timer);
// startBtn.addEventListener('click', bindFn);

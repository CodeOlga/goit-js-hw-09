import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

// Функція, яка на момент сабміту форми
// викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount.
// Під час кожного виклику передаємо їй номер промісу(position), що створюється,
// і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

function onFormSubmit(e) {
  e.preventDefault();

  //відслідковуємо подію, тому можемо отримати доступ до інпутів через їх name
  const {
    elements: { amount, delay, step },
  } = e.currentTarget;

  //поточна затримка, буде різною на кожній ітерації
  //приводимо до числа

  let currentDelay = Number(delay.value);

  //створюємо цикл для створення кожного окремого проміса

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    //додаємо до поточної затримки крок збільшення затримки
    currentDelay += Number(step.value);
  }
  //чистимо форму
  e.target.reset();
}

// Функція createPromise поверталє один проміс, який виконується або відхиляється через delay часу.
// Значенням промісу є об'єкт з властивостями position і delay зі значеннями однойменних параметрів.

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    //setTimeout для першої затримки delay
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

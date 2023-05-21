import Notiflix from 'notiflix';

const form = document.querySelector('.form');
// const firstDelay = document.querySelector('input[name="delay"]');
// const delayStep = document.querySelector('input[name="step"]');
// const amount = document.querySelector('input[name="amount"]');
// const submitBtn = document.querySelector('button[type="submit"]');

form.addEventListener('submit', onFormSubmit);
// submitBtn.addEventListener('submit', createPromise);

function onFormSubmit(e) {
  e.preventDefault();

  // const delay = e.currentTarget.delay;
  // const step = e.currentTarget.step;
  // const amount = e.currentTarget.amount;

  const {
    elements: { amount, delay, step },
  } = e.currentTarget;

  for (let i = 1; i <= amount.value; i += 1) {
    // step + 1;
    let totalDelay = parseInt(delay.value) + parseInt(step.value);
    // const totalDelay = parseInt(delay.value) + parseInt(step.value);
    totalDelay += parseInt(step.value);
    // console.log(totalDelay);
    createPromise(i, totalDelay)
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
  }
  // console.log(e);
  // console.log(totalDelay);
  // console.log(delay);
  // console.log(e.currentTarget.step);
  // console.log(e.currentTarget.amount);

  // return;
}

// const createPromise = (position, delay) => {
// const promise = function createPromise (position, delay) {
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // resolve(onFormSubmit);
        resolve({ position, delay });
        // resolve({ firstDelay, delayStep, amount });
        // resolve('Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)');
      } else {
        reject({ position, delay });
        // reject('Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)');
      }
    }, delay);
  });
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

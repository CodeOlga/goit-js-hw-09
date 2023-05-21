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
  const firstDelay = e.currentTarget.delay;
  const delayStep = e.currentTarget.step;
  const amount = e.currentTarget.amount;
  // const {
  //   elements: { amount, delay, step },
  // } = e.currentTarget;
  console.log(e);
}

// const createPromise = (position, delay) => {
// const promise = function createPromise (position, delay) {
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    // setTimeout(() => {
    if (shouldResolve) {
      // resolve(onFormSubmit);
      resolve({ position, delay });
      // resolve({ firstDelay, delayStep, amount });
      // resolve('Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)');
    } else {
      reject();
      // reject('Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)');
    }
    // }, delay);
  });
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

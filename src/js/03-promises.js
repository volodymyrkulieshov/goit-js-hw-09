import Notiflix from 'notiflix';

// const selectors = {
//   form: document.querySelector('.form'),
//   submitBtn: document.querySelector('[type = "submit"]'),
// };

const form = document.querySelector('.form');
// const submitBtn = document.querySelector('[type ="submit"]');

form.addEventListener('submit', handlerSubmitform);

function handlerSubmitform(evt) {
  // console.log(evt);
  evt.preventDefault();

  let delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    // console.log(i);
    createPromise(i, delay)
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
    delay += step;
  }
  form.reset();
  // submitBtn.disabled = true;
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

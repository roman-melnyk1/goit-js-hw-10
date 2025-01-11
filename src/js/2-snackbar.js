import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submitted");

    const form = event.currentTarget;
    const delay = parseInt(form.elements.delay.value, 10);
    const state = form.elements.state.value;

    if (isNaN(delay) || delay < 0) {
        iziToast.error({
            title: "Error",
            message: "Please enter a valid delay",
        });
        return;
    }

    createPromise(delay, state).then((result) => {
        iziToast.success({
            title: "Success",
            message: `Fulfilled promise in ${delay}ms`,
        });
    }).catch((error) => {
        iziToast.error({
            title: "Error",
            message: `Rejected promise in ${error}ms`,
        });
    });
}

function createPromise(delay, state) {
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else if (state === "rejected") {
        reject(delay);
      }
    }, delay);
  });
}
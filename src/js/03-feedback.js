import throttle from 'lodash.throttle';
// Get the needed elements from DOM
const form = document.querySelector('.feedback-form');
const emailEl = document.querySelector('label [name="email"]');
const messageEl = document.querySelector('label [name="message"]');
const STORAGE_KEY = 'feedback-form-state';

// Get the values of the DOM elements create an object from them and write it to Local Storage
form.addEventListener('input', throttle(modificationInput, 500));
function modificationInput() {
  const email = emailEl.value;
  const message = messageEl.value;
  const formData = { email, message };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

pageLoaded();

// Declaration of a function that fills in the fields of the form with the saved data
function pageLoaded() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    emailEl.value = savedData.email;
    messageEl.value = savedData.message;
  }
}
// Handling the submit event of the form; when pressing submit the object from
// Local storage to be deleted
// and the submited data to be displayed on Console
form.addEventListener(
  'submit',
  throttle(event => {
    event.preventDefault();
    const email = emailEl.value;
    const message = messageEl.value;
    const formData = { email, message };
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
    form.reset();
  }, 5000)
);

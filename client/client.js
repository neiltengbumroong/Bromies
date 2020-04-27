const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading-icon');
const API_URL = 'http://localhost:5000/brotes';

loadingElement.style.display = 'none';

listAllBrotes();

// listen to form for events upon submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  const brote = {
    name,
    content
  };

  // hide loading icon on form submission
  form.style.display = 'none';
  loadingElement.style.display = '';

  // send this form data to the back-end server
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(brote),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())
    .then(createdBrote => {
      console.log(createdBrote);
      form.reset();
      form.style.display = '';
      loadingElement.style.display = 'none';
    });
});

function listAllBrotes {
  fetch();
}

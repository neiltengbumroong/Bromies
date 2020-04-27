const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading-icon');
const API_URL = 'http://localhost:5000/brotes';
const brotesElement = document.querySelector('.brotes');

loadingElement.style.display = 'none';

listAllBrotes();

// listen to form for events upon submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  // create object based on form data
  const brote = {
    name,
    content,
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
      form.reset();

      // hide form for 10 seconds
      setTimeout(() => {
        form.style.display = '';
      }, 30000);

      listAllBrotes();
      form.style.display = '';
      loadingElement.style.display = 'none';
    });
});

function listAllBrotes() {
  brotesElement.innerHTML = '';
  fetch(API_URL)
    .then(response => response.json())
    .then(brotes => {
      brotes.reverse();
      brotes.forEach(brote => {
        const div = document.createElement('div');

        const header = document.createElement('h2');
        header.textContent = brote.name;

        const contents = document.createElement('p');
        contents.textContent = brote.content;

        const date = document.createElement('small');
        date.textContent = brote.created;

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        brotesElement.appendChild(div);
      })
    });
}

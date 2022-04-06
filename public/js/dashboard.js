const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#submission-name').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#submission-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/submissions`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create submissions');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/submissions/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete sumbission');
    }
  }
};

document
  .querySelector('.new-submissions-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.submissions-list')
  .addEventListener('click', delButtonHandler);

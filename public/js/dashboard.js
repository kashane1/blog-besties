// start of the function that creates a new submission
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#submission-name').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#submission-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/submissions`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create submissions');
    }
  }
};

// start of the function that deletes a submission
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/submissions/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete submission');
    }
  }
};

document
  .getElementById('submissionBtn')
  .addEventListener('click', newFormHandler);

// fancy solution for deleting multiple elements that match a class selector
document
  .querySelectorAll('.submissions-list')
  .forEach(item => item.addEventListener('click', delButtonHandler));

// start of the js that handles creating a comment
const commentFormHandler = async (event) => {
  event.preventDefault();

  // grab submission_id from the button
  const id = event.target.getAttribute('data-id');
  console.log(id);

  // Collect values from the comment form
  const comment = document.querySelector('#user-comment').value.trim();
  console.log(comment);

  if (comment) {
    // Send a POST request to the API endpoint

    // need to work on this a lot more

    // routes not done, 
    const response = await fetch(`/api/submissions/${id}`, { 
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, reload the page and show the new comment
      document.location.reload();
    } else {
      console.log('some error code');
      alert(response.statusText);
    }
  }
};

// start of the js that will delete a comment
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    // grab comment.id from the button
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
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
  .getElementById('commentBtn')
  .addEventListener('click', commentFormHandler);

document
  .querySelectorAll('.comment-list')
  .forEach(item => item.addEventListener('click', delButtonHandler));

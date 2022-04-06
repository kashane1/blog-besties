const commentFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the comment form
  const comment = document.querySelector('#user-comment');

  if (comment) {
    // Send a POST request to the API endpoint

    // need to work on this a lot more

    // routes not done, 
    const response = await fetch('/api/users/comments', { // ??? switched 'login' for 'comments'
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, reload the page and show the new comment
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
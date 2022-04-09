const router = require('express').Router();
const { Submission, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// start of create a submisison route
router.post('/', withAuth, async (req, res) => {
  try {
    const newSubmission = await Submission.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newSubmission);
  } catch (err) {
    res.status(400).json(err);
  }
});

// start of delete submissions route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const submissionData = await Submission.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!submissionData) {
      res.status(404).json({ message: 'No Submission found with this id!' });
      return;
    }

    res.status(200).json(submissionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// start of create comment route
// needed it to be here in order for it to attach to the submission
router.post('/:id', withAuth, async (req, res) => {
  try {
    // creates the comment and pulls the submission_id from the url and the user_id from the session
    const commentData = await Comment.create({
      description: req.body,
      submission_id: req.params.id,
      user_id: req.session.user_id,
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment was created' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//start of delete comment route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        submission_id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(submissionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// i actually think these routes need to be attached to the submission url; /submission/:id/

// no need for viewing all comment routes, they will load with the /submission/:id page

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newSubmission = await Comment.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newSubmission);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// copied this over to submissionRoutes
// // start of create comment route
// router.post('/:id', withAuth, async (req, res) => {
//   try {
//     // creates the comment and pulls the submission_id from the url and the user_id from the session
//     const commentData = await Comment.create({
//       ...req.body,
//       submission_id: req.params.id,
//       user_id: req.session.user_id,
//     });

//     if (!commentData) {
//       res.status(404).json({ message: 'No comment was created' });
//       return;
//     }

//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// ithink i still need this route in order to delete 1 specific comment; /comment/:id

//start of delete comment route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
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

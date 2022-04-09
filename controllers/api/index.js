const router = require('express').Router();
const userRoutes = require('./userRoutes');
const submissionRoutes = require('./submissionRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/submissions', submissionRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
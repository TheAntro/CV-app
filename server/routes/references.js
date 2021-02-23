const express = require('express');
const {
  getReferences,
  addReference,
  deleteReferences,
  deleteReference,
} = require('../controllers/references');
const { authorize, hasRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(authorize);

router.route('/')
  .get(getReferences)
  .post(addReference)
  .delete(hasRole('admin'), deleteReferences);
router.route('/:id').delete(deleteReference);

module.exports = router;

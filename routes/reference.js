const express = require('express');
const { 
  getReferences, 
  addReference, 
  deleteReferences, 
  deleteReference 
} = require('../controllers/reference');

const router = express.Router({ mergeParams: true });

router.route('/').get(getReferences).post(addReference).delete(deleteReferences);
router.route('/:id').delete(deleteReference);

module.exports = router;

const { Router } = require('express');
const router = Router();

const Inspiration = require('../controllers/inspiration');

router.post('/', Inspiration.addInspiration);
router.get('/', Inspiration.getAllInspiration);
router.get('/:inspirationID', Inspiration.getInspiration);
module.exports = router;
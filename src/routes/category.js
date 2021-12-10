const { Router } = require('express');
const router = Router();

const Category = require('../controllers/category');

router.get('/', Category.getAllCategory);

module.exports = router;
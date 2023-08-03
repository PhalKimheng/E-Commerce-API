var express = require('express');
// const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middleware/authentication');
// const { } = require('../schemas');
var router = express.Router();
const categoryService = require('../services/category');

// all users
router.get('/all', async (req, res) => {
  const result = await categoryService.findAll();
  res.json(result);
})
// Categorized items
router.get('/categorized-items', async (req, res) => {
  const result = await categoryService.findCategorizedItems()
  res.json(result);
})

router.get('/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  const result = await categoryService.findById(id)
  res.json(result);
})

router.post('/create', async (req, res, next) => {
  const {name, description, image_url } = req.body
  const result = await categoryService.create({name, description, image_url});
  res.json(result);
})

router.post('/update/:id', auth.ensureSignedIn, async (req, res, next) => {
  const { name, desc, image_url } = req.body
  const { id } = req.params
  console.log(id);
  const result = await categoryService.update(id, {name, desc, image_url})
  res.json(result);
})

router.post('/delete/:id', auth.ensureSignedIn, async (req, res, next) => {
  const { id } = req.params
  const result = await categoryService.remove(id)
  res.json(result);
})

module.exports = router
var express = require('express');
// const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middleware/authentication');
// const { } = require('../schemas');
var router = express.Router();
const itemService = require('../services/item');

// all users
router.get('/all', async (req, res) => {
  const result = await itemService.findAll()
  res.json(result)
})

router.get('/:id', auth.ensureSignedIn, async function (req, res, next) {
  const { id } = req.params;
  const result = await itemService.findById(id);
  res.json(result);
})

router.post('/create', async (req, res, next) => {
  const {name, category, description} = req.body
  const result = await itemService.create({name, category, description})
  res.json(result);
})


router.post('/update/:id', auth.ensureSignedIn, async (req, res, next) => {
  const {name, category, description} = req.body
  const {id} = req.params
  const result = await itemService.update(id, {name, category, description})
  res.json(result);
})

router.post('/delete/:id', auth.ensureSignedIn, async (req, res, next) => {
  const {id} = req.params
  const result = await itemService.remove(id);
  res.json(result);
})

module.exports = router
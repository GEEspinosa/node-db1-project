const router = require('express').Router();
const Accounts = require('./accounts-model')
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
} = require ('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.status(200).json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    res.status(200).json(req.account[0])
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create({name: req.name, budget: req.body.budget})
    res.status(201).json(newAccount[0])
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(updatedAccount[0])
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    const deletedAccount = await Accounts.deleteById(req.params.id)
    res.status(200).json(deletedAccount[0])
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;

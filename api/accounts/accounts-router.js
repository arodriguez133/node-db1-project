const router = require('express').Router()
const Account = require('./accounts-model');
const mw = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.status(200).json(accounts)
  }
  catch (err) {
    res.json({
      err: err.message,
      stack: err.stack
    })
  }
})

router.get('/:id', mw.checkAccountId, async (req, res, next) => {
  try {
    const id = req.params.id;
    const account = await Account.getById(id);
    res.status(200).json(account);
  }
  catch (err) {
    res.json({
      err: err.message,
      stack: err.stack
    })
  }
})

router.post('/', mw.checkAccountPayload, async (req, res, next) => {
  const { name, budget } = req.body;
  try {
    const newAccount = await Account.create({ name, budget });
    const account = await Account.getById(newAccount);
    res.status(201).json(account);
  }
  catch (err) {
    res.status(404).json({
      err: err.message,
      stack: err.stack
    })
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    const updatedAccount = await Account.updateById(account, req.body);
    res.status(200).json(updatedAccount)
  }
  catch (err) {
    res.status(404).json({
      err: err.message,
      stack: err.stack
    })
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const account = await Account.getById(id);
    console.log(account);
    res.status(200).json(account);
    return await Account.deleteById(id);
  }
  catch (err) {
    res.status(404).json({
      err: err.message,
      stack: err.stack
    })
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: "Could not process request at this time",
    err: err.message
  })
})

module.exports = router;

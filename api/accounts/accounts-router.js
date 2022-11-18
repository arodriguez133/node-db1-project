const router = require('express').Router()
const Account = require('./accounts-model');

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

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const account = await Account.getById(id);
    console.log(account);
    res.status(200).json(account);
  }
  catch (err) {
    res.json({
      err: err.message,
      stack: err.stack
    })
  }
})

router.post('/', async (req, res, next) => {
  const { name, budget } = req.body;
  try {
    console.log(req.body);
    const newAccount = await Account.create({ name, budget });
    res.status(201).json(newAccount);
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

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;

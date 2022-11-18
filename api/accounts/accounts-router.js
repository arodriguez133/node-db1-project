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

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;

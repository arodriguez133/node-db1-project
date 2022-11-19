const Account = require('./accounts-model');
const db = require('../../data/db-config');


exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (name == "" || budget == "") {
    res.status(400).json({
      message: "name and budget are required"
    })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({
      message: "Name of account must be between 3 and 100 characters"
    })
  } else if (budget > 1e9 || budget < 0) {
    res.status(400).json({
      message: "budget of account is too large or too small"
    })
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  db.select('name')
    .from('accounts')
    .where('name', name)
    .then((userList) => {
      if (userList.length > 0) {
        res.status(400).json({
          message: "That name is taken",
        })
      } else {
        next();
      }
    })
}

exports.checkAccountId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.getById(id);
    if (!post) {
      res.status(404).json({
        message: "There is no post with specified ID"
      })
    } else {
      req.post = post;
      next();
    }
  }
  catch (err) {
    res.status(500).json({
      message: "Error retrieving the data",
      err: err.message,
      stack: err.stack
    })
  }
}


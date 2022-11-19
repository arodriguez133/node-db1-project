const Post = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {

}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
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

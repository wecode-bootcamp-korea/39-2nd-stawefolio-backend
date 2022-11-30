const globalErrorHandler = (err, req, res, next) => {
  if (err.message) {
    res.status(err.statusCode || 500).json({ message: err.message });
    return;
  }
  res.status(500).json({ message: 'Internal Server Error' });
};

function asyncWrap(asyncController) {
  return async (req, res, next) => {
    try {
      await asyncController(req, res);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { globalErrorHandler, asyncWrap };

const middleware = (fun) => async (req, res, next) => {
  try {
    await fun(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = middleware;

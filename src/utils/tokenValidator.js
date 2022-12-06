const jwt = require('jsonwebtoken');
const authDao = require('../models/authDao');
const { customError } = require('../utils/errorHandler');

const tokenValidator = async (req, res, next) => {
  const jwtToken = req.header('Authorization');
  const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
  const user = authDao.getUserByKakaoId(payload.kakaoId);

  if (!user) customError('Invalid User', 401);

  req.userId = user.id;

  next();
};

module.exports = { tokenValidator };

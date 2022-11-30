const jwt = require('jsonwebtoken');
const authDao = require('../models/authDao');

const tokenValidator = async (jwtToken) => {
  const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

  if (!payload) {
    const err = new Error('Expired token');
    err.statusCode = 401;
    throw err;
  }

  const kakaoId = payload.kakaoId;

  const user = await authDao.getUserByKakaoId(kakaoId);

  if (!user) {
    const err = new Error('Invalid user');
    err.statusCode = 401;
    throw err;
  }

  return user.id;
};

module.exports = { tokenValidator };

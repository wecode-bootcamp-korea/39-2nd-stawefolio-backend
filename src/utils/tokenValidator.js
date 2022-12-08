const jwt = require('jsonwebtoken');
const authDao = require('../models/authDao');
const { customError } = require('../utils/errorHandler');
const {asyncWrap} = require('./errorHandler')

const tokenValidator = async (req, res, next) => {
  const jwtToken = req.header('Authorization');
  const payload = jwt.verify(jwtToken.substring(1,jwtToken.length-1), process.env.JWT_SECRET_KEY);
  const user = await authDao.getUserByKakaoId(payload.kakaoId);

  if (!user) customError('Invalid User', 401);
  req.userId = user.id;
  
  next();
}

module.exports = { tokenValidator };

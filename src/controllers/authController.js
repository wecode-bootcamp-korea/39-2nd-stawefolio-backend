const { asyncWrap } = require('../utils/errorHandler');
const authService = require('../services/authService');
const { customError } = require('../utils/errorHandler');

const auth = asyncWrap(async (req, res) => {
  const { authorizationCode } = req.query;

  if (!authorizationCode) customError('No Authorization Code', 400);

  const jwtToken = await authService.auth(authorizationCode);

  return await res.status(200).json({ jwtToken: jwtToken });
});

module.exports = { auth };
